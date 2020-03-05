import React, { Component } from 'react';
import { View, Image, KeyboardAvoidingView, Dimensions, Text, StyleSheet, Switch, TouchableOpacity, Button, Alert, prompt, Modal } from 'react-native';
import firebase from './firebase';
import { TextInput } from 'react-native-gesture-handler';
const { width, height } = Dimensions.get('window');
export default class PasswordReset extends Component {

    
    state = { email: '', sent: null, errorMessage: null } 
        
       
    resetPassword = () => {
        var auth = firebase.auth();
        var removeSpaceEmail = this.state.email.replace(/\s+/g, '');
        this.setState({ email: removeSpaceEmail})
        this.setState({sent: null, errorMessage: null})
            if (!this.state.email) {
                this.setState({errorMessage: 'Please enter an email.'})
            }
        auth.sendPasswordResetEmail(removeSpaceEmail)
                .then(
                    () => this.setState({ sent: 'An email has been sent to you. Please follow the link to reset your password.' }),
                    )
                .catch(e => this.setState({ errorMessage: e + ' Please try again.'})); 
}
        
    
    render() {
        return (
            <KeyboardAvoidingView style={styles.container} behavior="padding">
                <Image source={require('./assets/loginsignupbackground.jpg')} style={styles.backgroundImage} />

                
               
                {this.state.sent &&
                    <Text style={{ color: 'green', textAlign: 'center', width: width - 50 }}>
                        {this.state.sent}
                    </Text>}
                {this.state.errorMessage &&
                    <Text style={{ color: 'red', textAlign: 'center', width: width - 50 }}>
                        {this.state.errorMessage}
                    </Text>}
                <TextInput
                    style={styles.textInput}
                    autoCapitalize="none"
                    placeholder="please enter account email"
                    placeholderTextColor="black"
                    onChangeText={email => this.setState({ email })}
                    value={this.state.email}
                />
                
                <TouchableOpacity style={styles.button}
                    title="Change Username" onPress={this.resetPassword} >
                    <Text style={{ fontWeight: 'bold', textAlign: 'center' }}>Reset Password</Text>
                </TouchableOpacity>
                
                
                <TouchableOpacity style={styles.buttonRed}
                    title="Go Back"
                    onPress={() => this.props.navigation.navigate('LoginScreen')}>
                    <Text style={{ fontWeight: 'bold', textAlign: 'center' }}>Go Back</Text>
                </TouchableOpacity>

            </KeyboardAvoidingView>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center'
    },
    titleText: {
        fontSize: 30,
        top: 0,
        position: "absolute",
    },
    padding: {
        padding: 10,
    },
    backgroundImage: {
        flex: 1,
        position: 'absolute',
        width: width,
        height: height,

    },
    textInput: {
        height: 40,
        width: width - 50,
        borderColor: 'black',
        borderRadius: 10,
        backgroundColor: 'rgba(255,255,255, 0.5)',
        borderWidth: 1,
        borderWidth: 1,
        margin: 5,
        padding: 7,
        marginTop: 8,
    },
    button: {
        backgroundColor: "green",
        padding: 15,
        // backgroundColor: 'rgba(0,0,0, 0.1)',
        borderWidth: 1,
        borderRadius: 10,
        marginTop: 0,
        width: width - 50,
    },
    buttonRed: {
        backgroundColor: "red",
        padding: 15,
        // backgroundColor: 'rgba(0,0,0, 0.1)',
        borderWidth: 1,
        borderRadius: 10,
        marginTop: 30,
        width: width - 50,
    },
});