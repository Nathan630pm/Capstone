// Loading.js
import React, { Component } from 'react';
import { View, Text, ActivityIndicator, Image, Dimensions, StyleSheet, setTimeout, InteractionManager,  } from 'react-native'
import firebase from './firebase';
const { width, height } = Dimensions.get('window');
export default class Loading extends React.Component {
    componentDidMount() {
        this._navListener = this.props.navigation.addListener('didFocus', () => {
            // get your new data here and then set state it will rerender
            firebase.auth().onAuthStateChanged(user => {
                console.log()
                this.props.navigation.replace(user ? 'tabs' : 'LoginScreen')
            })
        });
        firebase.auth().onAuthStateChanged(user => {
            console.log()
            this.props.navigation.replace(user ? 'tabs' : 'LoginScreen')
        })
        
    }

    constructor(props) {
        super(props);
        this.state = {
            tooLong: ''
        };
    }
    render() {
        return (
            
            <View style={styles.container}>
                <Image source={require('./assets/loginsignupbackground.jpg')} style={styles.backgroundImage} />
                <Text>Checking your credentials, please wait...</Text>
                <ActivityIndicator size="large" />
                <Text style={{textAlign: 'center'}}>If this takes more than 10 seconds, please check your network connection, and try again.</Text>
                
            </View>
        )
    }
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    tooLong: {
        color: 'red',
    },
    backgroundImage: {
        flex: 1,
        position: 'absolute',
        width: width,
        height: height,

    },
})