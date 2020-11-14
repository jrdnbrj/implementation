import React from 'react'
import { Component } from 'react';
import { TextInput, StyleSheet, View } from 'react-native'

class CoinsSearch extends Component {
    
    state = {
        query: ''
    }

    handleText = query => {
        this.setState({ query })
        { this.props.onChange && this.props.onChange(query) }
    }

    render() {

        const { query } = this.state

        return (
            <View>
                <TextInput 
                    onChangeText={this.handleText}
                    value={query}
                    placeholder='Search coin'
                    placeholderTextColor= 'white'
                    style={styles.textInput}
                />
            </View>
        )
    }
}

const styles = StyleSheet.create({
    textInput: {
        height: 46,
        backgroundColor: '#272c35',
        paddingLeft: 16,
        borderBottomWidth: 2,
        borderBottomColor: '#e0e0e0',
        color: 'white'
    },
})

export default CoinsSearch