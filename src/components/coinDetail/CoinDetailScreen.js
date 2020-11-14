import React, { Component } from 'react'
import { View, Text, Image, StyleSheet, SectionList, FlatList, Pressable, Alert } from 'react-native'
import Colors from 'cryptoTracker/src/res/colors'
import Http from 'cryptoTracker/src/libs/http'
import CoinMarketItem from './CoinMarketItem'
import Storage from 'cryptoTracker/src/libs/storage'

class CoinDetailScreen extends Component {

    state = {
        coin: {},
        market: [],
        isFavorite: false
    }

    toggleFavorite = () => {
        if(this.state.isFavorite) this.removeFavorite()
        else this.addFavorite()
    }

    addFavorite = async () => {
        const coin = JSON.stringify(this.state.coin)
        const key = `favorite-${this.state.coin.id}`

        const stored = await Storage.instance.store(key, coin)
        if (stored) {
            this.setState({ isFavorite: true })
        }
    }

    removeFavorite = async () => {
        Alert.alert('Remove Favorite', 'Are you sure?', [
            {
                text: 'cancel',
                onPress: () => {},
                style: 'cancel'
            },
            {
                text: 'Remove',
                onPress: async () => {
                    await Storage.instance.remove(`favorite-${this.state.coin.id}`)
                    this.setState({ isFavorite: false })
                },
                style: 'destructive'
            }
        ])

    }

    getFavorite = async () => {
        try {
            const key = `favorite-${this.state.coin.id}`
            const favStr = await Storage.instance.get(key)
            if (favStr != null) this.setState({ isFavorite: true })
        } catch(err) {
            console.log('Error get favorite.', err)
        }
    }

    getSections = coin => {
        return [
            { 
                title: "Market Cap",
                data: [coin.market_cap_usd] 
            },
            { 
                title: "Volume 24h",
                data: [coin.volume24] 
            },
            { 
                title: "Change 24",
                data: [coin.percent_change_24h] 
            }
            
        ]
    }

    getMarkets = async coinId => {
        const markets = await Http.instance.get(`https://api.coinlore.net/api/coin/markets/?id=${coinId}`)
        this.setState({ markets })
    }

    componentDidMount() {
        const { coin } = this.props.route.params
        this.props.navigation.setOptions({ title: coin.symbol })
        this.getMarkets(coin.id)
        this.setState({ coin }, () => this.getFavorite())
        
    }

    render() {

        const { coin, markets, isFavorite } = this.state

        return(
            <View style={styles.container}>
                <View style={styles.subHeader}>
                    <View style={styles.row}>
                        <Image style={styles.iconImg} source={{ uri: `https://c1.coinlore.com/img/25x25/${coin.nameid}.png` }} />
                        <Text style={styles.titleText}>{coin.name}</Text>
                    </View>
                    <Pressable
                        onPress={this.toggleFavorite}
                        style={[
                            styles.btnFavorite,
                            isFavorite ?
                            styles.btnFavoriteRemove :
                            styles.btnFavoriteAdd
                        ]}
                    >
                        <Text style={styles.btnFavoriteText}>{ isFavorite ? 'Remove Favorite' : 'Add Favorite' }</Text>
                    </Pressable>
                </View>
                <SectionList
                    style={styles.section}
                    sections={this.getSections(coin)}
                    keyExtractor={item => item}
                    renderItem={({ item }) => 
                        <View style={styles.sectionItem}>
                            <Text style={styles.itemText}>{item}</Text>
                        </View>
                    }
                    renderSectionHeader={({ section }) => 
                        <View style={styles.sectionHeader}>
                            <Text style={styles.sectionText}>{section.title}</Text>
                        </View>
                    }
                />
                <Text style={styles.marketsTitle}>Markets</Text>
                <FlatList 
                    style={styles.list}
                    horizontal={true}
                    data={markets}
                    renderItem={({ item }) => <CoinMarketItem item={item} />}
                />
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.charade
    },
    subHeader: {
        backgroundColor: 'rgba(0, 0, 0, 0.1)',
        padding: 16,
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    titleText: {
        fontSize: 16,
        fontWeight: 'bold',
        color: 'white',
        marginLeft: 8
    },
    row: {
        flexDirection: 'row'
    },  
    iconImg: {
        height: 25,
        width: 25
    },
    section:{
        maxHeight: 220
    },
    list: {
        maxHeight: 100,
        paddingLeft: 16
    },
    sectionHeader: {
        backgroundColor: 'rgba(0, 0, 0, 0.2)',
        padding: 8
    },
    sectionItem: {
        padding: 8
    },
    itemText: {
        color: 'white',
        fontSize: 14
    },
    sectionText: {
        color: 'white',
        fontSize: 14,
        fontWeight: 'bold'
    },
    marketsTitle: {
        color: 'white',
        fontSize: 16,
        marginBottom: 16,
        marginLeft: 16,
        fontWeight: 'bold'
    },
    btnFavorite: {
        padding: 8,
        borderRadius: 8
    },
    btnFavoriteAdd: {
        backgroundColor: '#3c6fc8'
    },
    btnFavoriteRemove: {
        backgroundColor: '#ef6372'
    },
    btnFavoriteText: {
        color: 'white'
    }
})

export default CoinDetailScreen