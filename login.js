// Login.js
import React from 'react'
import { StyleSheet, Text, Image, TextInput, Dimensions, View, Button, KeyboardAvoidingView, BackHandler } from 'react-native'
import firebase from './firebase';
import { TouchableOpacity } from 'react-native-gesture-handler';
const { width, height } = Dimensions.get('window');



export default class Login extends React.Component {

    componentDidMount() {

        this._navListener = this.props.navigation.addListener('willFocus', () => {
            this.setState({ errorMessage: null });
        });
    } 
    
    state = { email: '', password: '', errorMessage: null }
    handleLogin = () => {
        // TODO: Firebase stuff...
        state = { email: '', password: '', errorMessage: null }
            const { email, password } = this.state
            firebase
                .auth()
                .signInWithEmailAndPassword(email.replace(/\s+/g, ''), password)
                .then(() => this.props.navigation.replace('tabs'))
                .catch(error => this.setState({ errorMessage: error.message }))
        console.log('Logging in...')
    }
    render() {
        return (
            <KeyboardAvoidingView style={styles.container} behavior="padding">
                <Image source={require('./assets/loginsignupbackground.jpg')} style={styles.backgroundImage} />
                {this.state.errorMessage &&
                    <Text style={{ color: 'red', textAlign: 'center', width: width - 50 }}>
                        {this.state.errorMessage}
                    </Text>}
                <TextInput
                    style={styles.textInput}
                    autoCapitalize="none"
                    placeholder="Email"
                    placeholderTextColor="black"
                    onChangeText={email => this.setState({ email })}
                    value={this.state.email}
                />
                <TextInput
                    secureTextEntry
                    style={styles.textInput}
                    autoCapitalize="none"
                    placeholder="Password"
                    placeholderTextColor="black"
                    onChangeText={password => this.setState({ password })}
                    value={this.state.password}
                />
                <TouchableOpacity
                    style={styles.forgotPass}
                    onPress={() => this.props.navigation.navigate('PasswordReset')}
                >
                    <Text>forgot your password?</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.buttonBlue} title="Login" onPress={this.handleLogin} >
                    <Text style={{ fontWeight: 'bold', textAlign: 'center' }}>Login</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.buttonRed}
                    title="Don't have an account? Sign Up"
                    onPress={() => this.props.navigation.navigate('SignUp')}
                >
                    <Text style={{ fontWeight: 'bold', textAlign: 'center' }}>Don't have an account? Sign Up</Text>
                </TouchableOpacity>
                
            </KeyboardAvoidingView>
        )
    }
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
        
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
        padding: 15,
        // backgroundColor: 'rgba(0,0,0, 0.1)',
        borderWidth: 1,
        borderRadius: 10,
        marginTop: 30,
    },
    title: {
        fontSize: 20,
        top: 0,
        position: 'absolute',
    },
    backgroundImage: {
        flex: 1,
        position: 'absolute',
        width: width,
        height: height,
        
    },
    buttonBlue: {
        backgroundColor: "blue",
        padding: 15,
        // backgroundColor: 'rgba(0,0,0, 0.1)',
        borderWidth: 1,
        borderRadius: 10,
        marginTop: 30,
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
    forgotPass: {
        margin: 15,
        color: 'black',
    }
})