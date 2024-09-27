import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Animated } from 'react-native';

const cidades = [
    { nome: 'São Paulo', id: '1' },
    { nome: 'Rio de Janeiro', id: '2' },
    { nome: 'Salvador', id: '3' },
    { nome: 'Fortaleza', id: '4' },
    { nome: 'Belo Horizonte', id: '5' },
    { nome: 'Teresina', id: '6' },
];

export default function MainScreen({ navigation }) { 
    const [sidebarVisible, setSidebarVisible] = useState(false);
    const translateX = useState(new Animated.Value(-250))[0];

    const toggleSidebar = () => {
        setSidebarVisible(!sidebarVisible);
        Animated.timing(translateX, {
            toValue: sidebarVisible ? -250 : 0,
            duration: 300,
            useNativeDriver: true,
        }).start();
    };

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <TouchableOpacity onPress={toggleSidebar}>
                    <Text style={styles.hamburger}>☰</Text>
                </TouchableOpacity>
                <Text style={styles.title}>Destinos</Text>
                <View style={styles.hamburger} />
            </View>
            <View style={styles.grid}>
                {cidades.map((cidade) => (
                    <TouchableOpacity
                        key={cidade.id}
                        style={styles.button}
                        onPress={() => navigation.navigate('Destinos', { cidade: cidade.nome })} // Navega para a tela Destinos
                    >
                        <Text style={styles.buttonText}>{cidade.nome}</Text>
                    </TouchableOpacity>
                ))}
            </View>

            <Animated.View style={[styles.sidebar, { transform: [{ translateX }] }]}>
                <Text style={styles.sidebarTitle}>Menu</Text>
                <TouchableOpacity onPress={toggleSidebar} style={styles.closeButton}>
                    <Text style={styles.closeButtonText}>Fechar</Text>
                </TouchableOpacity>
            </Animated.View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'flex-start',
        alignItems: 'center',
        backgroundColor: '#EDEDED',
        padding: 20,
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        width: '100%',
        padding: 10,
        backgroundColor: '#6A0CAD',
        borderRadius: 10,
        elevation: 5,
        marginBottom: 20,
    },
    hamburger: {
        fontSize: 30,
        color: '#FFFFFF',
        width: 30,
    },
    title: {
        color: '#FFFFFF',
        fontSize: 20,
        fontWeight: 'bold',
        flex: 1,
        textAlign: 'center',
    },
    grid: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
        width: '100%',
    },
    button: {
        backgroundColor: '#6A0CAD',
        borderRadius: 15,
        padding: 12,
        margin: 5,
        width: '45%',
        alignItems: 'center',
        elevation: 3,
    },
    buttonText: {
        color: '#FFFFFF',
        fontSize: 16,
        fontWeight: 'bold',
    },
    sidebar: {
        position: 'absolute',
        top: 0,
        left: 0,
        bottom: 0,
        width: 250,
        backgroundColor: '#6A0CAD',
        padding: 20,
        elevation: 5,
    },
    sidebarTitle: {
        color: '#FFFFFF',
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 20,
    },
    closeButton: {
        backgroundColor: '#8A2BE2',
        borderRadius: 10,
        padding: 10,
        alignSelf: 'flex-start',
        marginBottom: 20,
    },
    closeButtonText: {
        color: '#FFFFFF',
        fontSize: 16,
    },
});
