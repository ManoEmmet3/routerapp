import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, ActivityIndicator, Alert } from 'react-native';
import NetInfo from '@react-native-community/netinfo';
import { useNavigation } from '@react-navigation/native'; 

export default function WeatherCard() {
    const [weatherData, setWeatherData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const apiKey = '41fd7259fb5d36ae7b7065637e5debab';
    const city = 'Teresina';
    const navigation = useNavigation(); 

    useEffect(() => {
        const fetchWeatherData = async () => {
            const state = await NetInfo.fetch();
            if (!state.isConnected) {
                Alert.alert('Sem conexão', 'Verifique sua conexão com a internet.');
                setLoading(false);
                return;
            }

            try {
                const response = await fetch(
                    `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}&units=metric`
                );

                if (!response.ok) {
                    throw new Error('Erro ao buscar dados do clima');
                }

                const data = await response.json();
                setWeatherData(data);
            } catch (err) {
                setError('Erro ao buscar dados do clima. Tente novamente mais tarde.');
                console.error('Error fetching weather data:', err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchWeatherData();
    }, []);

    const getWeatherIcon = (iconCode, dateTime) => {
        const hour = new Date(dateTime * 1000).getHours();
        const isDaytime = hour >= 5 && hour < 18; 

        if (isDaytime) {
            return '☀️'; 
        } else {
            return '🌙'; 
        }
    };

    if (loading) {
        return (
            <View style={styles.loadingContainer}>
                <ActivityIndicator size="large" color="#6A0CAD" />
            </View>
        );
    }

    if (error) {
        return (
            <View style={styles.errorContainer}>
                <Text style={styles.errorText}>{error}</Text>
            </View>
        );
    }

    if (!weatherData || !weatherData.list) {
        return (
            <View style={styles.errorContainer}>
                <Text style={styles.errorText}>Dados do clima não disponíveis.</Text>
            </View>
        );
    }

    // Previsão atual
    const currentWeather = weatherData.list[0];
    const temperature = currentWeather.main.temp.toFixed(1);
    const weatherIcon = getWeatherIcon(currentWeather.weather[0].icon, currentWeather.dt);

    return (
        <View style={styles.container}>
            {/* Previsão atual */}
            <View style={styles.card}>
                <View style={styles.header}>
                    <View style={styles.tempLocationContainer}>
                        <Text style={styles.temperature}>{temperature}°C</Text>
                        <Text style={styles.location}>{weatherData.city.name}, {weatherData.city.country}</Text>
                    </View>
                    <Text style={styles.weatherImage}>{weatherIcon}</Text>
                </View>
            </View>

            {/* Previsão horária */}
            <View style={styles.card}>
                <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                    <View style={styles.forecastRow}>
                        {weatherData.list.slice(0, 5).map((forecast, index) => (
                            <ForecastColumn 
                                key={index}
                                temp={`${forecast.main.temp.toFixed(1)}°C`}
                                time={new Date(forecast.dt * 1000).toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' })}
                                icon={getWeatherIcon(forecast.weather[0].icon, forecast.dt)}
                            />
                        ))}
                    </View>
                </ScrollView>
            </View>

            {/* Previsão diária */}
            <View style={styles.card}>
                <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                    <View style={styles.forecastRow}>
                        {weatherData.list.filter((_, index) => index % 8 === 0).map((forecast, index) => (
                            <ForecastColumn 
                                key={index}
                                temp={`${forecast.main.temp.toFixed(1)}°C`}
                                day={new Date(forecast.dt * 1000).toLocaleDateString('pt-BR', { weekday: 'short' })}
                                icon={getWeatherIcon(forecast.weather[0].icon, forecast.dt)}
                            />
                        ))}
                    </View>
                </ScrollView>
            </View>

            {/* Botão "Destinos" */}
            <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('DestinosScreen')}>
                <Text style={styles.buttonText}>Destinos</Text>
            </TouchableOpacity>
        </View>
    );
}

const ForecastColumn = ({ temp, time, day, icon }) => (
    <View style={styles.forecastColumn}>
        <Text style={styles.tempText}>{temp}</Text>
        <Text style={styles.icon}>{icon}</Text>
        {time ? (
            <Text style={styles.time}>{time}</Text>
        ) : (
            <Text style={styles.day}>{day}</Text>
        )}
    </View>
);

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#EDEDED', 
        padding: 20,
    },
    loadingContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    errorContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    errorText: {
        color: 'red',
        fontSize: 16,
    },
    card: {
        backgroundColor: '#FFFFFF', 
        borderRadius: 25,
        padding: 20,
        marginBottom: 20,
        width: '90%',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 8,
        elevation: 5,
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    tempLocationContainer: {
        flexDirection: 'row', 
        alignItems: 'center',  
        marginRight: 10, 
    },
    temperature: {
        fontSize: 50,
        fontWeight: 'bold',
        color: '#6A0CAD', 
    },
    location: {
        fontSize: 16,
        color: '#6A0CAD', 
        marginLeft: 10, 
    },
    weatherImage: {
        fontSize: 50,
    },
    forecastRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    forecastColumn: {
        alignItems: 'center',
        marginHorizontal: 15,
    },
    tempText: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#6A0CAD', 
        marginBottom: 5,
    },
    icon: {
        fontSize: 40,
        marginBottom: 5,
    },
    time: {
        fontSize: 16,
        marginTop: 5,
        color: '#7F8C8D', 
    },
    day: {
        fontSize: 16,
        marginTop: 5,
        color: '#7F8C8D', 
    },
    button: {
        backgroundColor: '#6A0CAD',
        borderRadius: 25,
        padding: 15,
        marginTop: 20,
        alignItems: 'center',
        width: '90%',
    },
    buttonText: {
        color: '#FFFFFF', 
        fontSize: 18,
        fontWeight: 'bold',
    },
});
