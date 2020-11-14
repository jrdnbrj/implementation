import React from 'react'
import FavoriteScreen from './FavoritesScreen'
import { View, Text, StyleSheet } from 'react-native'
import { withSafeAreaInsets } from 'react-native-safe-area-context'

const FavoritesEmptyState = () => {
    return (
        <View style={styles.container}>
            <Text style={styles.text}>You don't have any favorite yet.</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignContent: 'center',
        justifyContent: 'center'
    },
    text: {
        color: 'white',
        fontWeight: 'bold',
        fontSize: 18,
        alignSelf: 'center'
    }
})

export default FavoritesEmptyState