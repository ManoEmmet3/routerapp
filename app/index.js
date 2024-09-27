import { StyleSheet, Text, View } from 'react-native';
// import { Link } from 'expo-router';
import  WeatherCard from './Tela_inicial'

export default function Index() {
  return (
    < WeatherCard/>
  );  
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
