import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Modal, Image, ScrollView } from 'react-native';

const cidades = [
    { 
        nome: 'São Paulo', 
        id: '1', 
        imagem: 'https://upload.wikimedia.org/wikipedia/commons/3/3f/Sao_Paulo_-_Avenida_Paulista.jpg', // Imagem de São Paulo
        descricao: 'A maior cidade do Brasil e um importante centro financeiro.',
        pontosTuristicos: ['Avenida Paulista', 'Ibirapuera Park', 'Mercadão'] 
    },
    { 
        nome: 'Rio de Janeiro', 
        id: '2', 
        imagem: 'https://upload.wikimedia.org/wikipedia/commons/c/cb/P%C3%A3o_de_A%C3%A7%C3%BAcar%2C_Rio_de_Janeiro%2C_Brasil.jpg', // Imagem do Rio de Janeiro
        descricao: 'Famosa por suas praias e o icônico Pão de Açúcar.',
        pontosTuristicos: ['Cristo Redentor', 'Praia de Copacabana', 'Pão de Açúcar'] 
    },
    { 
        nome: 'Salvador', 
        id: '3', 
        imagem: 'https://upload.wikimedia.org/wikipedia/commons/1/1d/Pelourinho%2C_Salvador.jpg', // Imagem de Salvador
        descricao: 'Conhecida por sua rica cultura afro-brasileira.',
        pontosTuristicos: ['Pelourinho', 'Elevador Lacerda', 'Igreja de São Francisco'] 
    },
    { 
        nome: 'Fortaleza', 
        id: '4', 
        imagem: 'https://upload.wikimedia.org/wikipedia/commons/5/51/Praia_do_Futuro%2C_Fortaleza.jpg', // Imagem de Fortaleza
        descricao: 'Famosa por suas belas praias e culinária.',
        pontosTuristicos: ['Praia do Futuro', 'Centro Dragão do Mar', 'Mercado Central'] 
    },
    { 
        nome: 'Belo Horizonte', 
        id: '5', 
        imagem: 'https://upload.wikimedia.org/wikipedia/commons/1/12/Pra%C3%A7a_da_Liberdade%2C_Belo_Horizonte.jpg', // Imagem de Belo Horizonte
        descricao: 'Conhecida pela sua gastronomia e a Pampulha.',
        pontosTuristicos: ['Praça da Liberdade', 'Igreja São Francisco', 'Museu de Artes'] 
    }
];

export default function DestinosScreen() {
    const [modalVisible, setModalVisible] = useState(false);
    const [selectedCity, setSelectedCity] = useState({});

    const handleCityPress = (city) => {
        setSelectedCity(city);
        setModalVisible(true);
    };

    return (
        <View style={styles.container}>
            <View style={styles.grid}>
                {cidades.map((cidade) => (
                    <TouchableOpacity
                        key={cidade.id}
                        style={styles.button}
                        onPress={() => handleCityPress(cidade)}
                    >
                        <Text style={styles.buttonText}>{cidade.nome}</Text>
                    </TouchableOpacity>
                ))}
            </View>
        
            <Modal
                animationType="slide"
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => setModalVisible(!modalVisible)}
            >
                <View style={styles.modalContainer}>
                    <View style={styles.modalContent}>
                        <Image source={{ uri: selectedCity.imagem }} style={styles.image} />
                        <Text style={styles.modalText}>{selectedCity.nome}</Text>
                        <Text style={styles.description}>{selectedCity.descricao}</Text>
                        <ScrollView>
                            <Text style={styles.subTitle}>Pontos Turísticos:</Text>
                            {selectedCity.pontosTuristicos && selectedCity.pontosTuristicos.map((ponto, index) => (
                                <Text key={index} style={styles.point}>{ponto}</Text>
                            ))}
                        </ScrollView>
                        <TouchableOpacity onPress={() => setModalVisible(false)} style={styles.closeButton}>
                            <Text style={styles.closeButtonText}>Fechar</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>
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
    modalContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    modalContent: {
        width: '80%',
        backgroundColor: 'white',
        padding: 20,
        borderRadius: 10,
        alignItems: 'center',
    },
    image: {
        width: '100%',
        height: 200,
        borderRadius: 10,
        marginBottom: 15,
    },
    modalText: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    description: {
        fontSize: 16,
        marginBottom: 10,
        textAlign: 'center',
    },
    subTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        marginVertical: 10,
    },
    point: {
        fontSize: 16,
        marginVertical: 5,
    },
    closeButton: {
        backgroundColor: '#8A2BE2',
        borderRadius: 10,
        padding: 10,
        marginTop: 15,
    },
    closeButtonText: {
        color: '#FFFFFF',
        fontSize: 16,
    },
});
