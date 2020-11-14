import React from 'react'
import { View, Text, Pressable, StyleSheet, Image } from 'react-native'
import Colors from 'cryptoTracker/src/res/colors'

const CoinsItem = ({ item, onPress }) => {

    const getImageArrow = () => {
        if(item.percent_change_1h > 0) return require('cryptoTracker/src/assets/arrow_up.png')
        else return require('cryptoTracker/src/assets/arrow_down.png')
    }

    return (
        <Pressable onPress={onPress} style={styles.container}>
            <View style={styles.row}>
                <Text style={styles.symbolText}>{item.name}</Text>
                <Text style={styles.nameText}>{item.symbol}</Text>
                <Text style={styles.priceText}>${item.price_usd}</Text>
            </View>
            <View style={styles.row}>
                <Text style={styles.percentText}>{item.percent_change_1h}</Text>
                <Image 
                    source={getImageArrow()}
                    style={styles.imgIcon}
                />
            </View>
        </Pressable>
    )
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        padding: 16,
        justifyContent: 'space-between',
        borderBottomColor: Colors.zircon,
        borderBottomWidth: 1,
        paddingLeft: 16,
    },
    row: {
        flexDirection: 'row'
    },
    symbolText: {
        color: 'white',
        fontWeight: 'bold',
        fontSize: 16,
        marginRight: 12
    },
    nameText: {
        color: 'white',
        fontSize: 14,
        marginRight: 16
    },
    percentText: {
        color: 'white',
        fontSize: 12,
        marginRight: 8,
    },
    priceText: {
        color: 'white',
        fontSize: 12,
    },
    imgIcon: {
        width: 15,
        height: 15
    }
})

export default CoinsItem