import React from 'react'
import { Text, View, StyleSheet } from 'react-native'

const CoinDetailScreen = ({ item }) => {

    return (
        <View style={styles.container}>
            <Text style={styles.nameText}>{item.name}</Text>
            <Text style={styles.priceText}>{item.price_usd}</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'rgba(0, 0, 0, 0.1)',
        borderColor: '#e0e0e0',
        borderWidth: 1,
        padding: 16,
        marginRight: 8,
        alignItems: 'center',
    },
    nameText: {
        color: 'white',
        fontWeight: 'bold'
    },
    priceText: {
        color: 'white'
    }
})

export default CoinDetailScreen