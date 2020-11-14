import React, { Component } from 'react'
import { View, Text, StyleSheet } from 'react-native'
import FavoritesEmptyState from './FavoritesEmptyState'
import CoinsItem from 'cryptoTracker/src/components/coins/CoinsItem'
import Storage from 'cryptoTracker/src/libs/storage'
import { FlatList } from 'react-native-gesture-handler'

class FavoritesScreen extends Component {

    state = {
        favorites: []
    }

    handlePress = coin => {
        this.props.navigation.navigate('CoinDetail', { coin })
    }

    getFavorites = async () => {
        try {
            const allKeys = await Storage.instance.getAllKeys()
            const keys = allKeys.filter(key => key.includes('favorite-'))
            const favs = await Storage.instance.multiGet(keys)
            const favorites = favs.map(fav => JSON.parse(fav[1]))
            this.setState({ favorites })
        } catch (err) {
            console.log('Get Favorite Error.', err)
        }
    }

    componentDidMount() {
        this.props.navigation.addListener('focus', this.getFavorites)
    }

    componentWillUnmount() {
        this.props.navigation.removeListener('focus', this.getFavorites)
    }

    render() {

        const { favorites } = this.state

        return (
            <View style={styles.container}>
                { 
                    favorites.length == 0 ? <FavoritesEmptyState /> :
                    <FlatList 
                        data={favorites}
                        renderItem={({ item }) => <CoinsItem item={item} onPress={() => this.handlePress(item)} />}
                    />
                }
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#272c35',
        flex: 1
    }
})

export default FavoritesScreen