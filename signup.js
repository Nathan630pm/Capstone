// SignUp.js
import React from 'react'
import { StyleSheet, Text, TextInput, Image, Dimensions, View, Button, KeyboardAvoidingView } from 'react-native'
import firebase from './firebase';
import { TouchableOpacity } from 'react-native-gesture-handler';
const { width, height } = Dimensions.get('window');
export default class SignUp extends React.Component {
    

    

    state = { userData: null, username: '', email: '', password: '', cpassword: '', errorMessage: null }
    


    handleSignUp = () => {
        var userData;
        this.setState({ errorMessage: null, userData: null });
        // state = { userData: null, username: '', email: '', password: '', cpassword: '', errorMessage: null, }
        
        if (this.state.password === this.state.cpassword) {
            var removeSpaceUsername = this.state.username.replace(/\s+/g, '');
            var removeSpaceEmail = this.state.email.replace(/\s+/g, '');
            this.setState({ username: removeSpaceUsername, email: removeSpaceEmail });
         firebase.database().ref().child(`users`).orderByChild('usernamelowercase').equalTo(removeSpaceUsername.toLowerCase()).once("value", snapshot => {
                    if (snapshot.exists()) {
                        this.setState({ userData: this.state.username, errorMessage: "Username is already taken." }, function () {
                            console.log("running... :/ VALUES: " + JSON.stringify(snapshot.val()))

                        })
                        userData = true
                        console.log("user entered: " + this.state.username + " errormessage: " + this.state.errorMessage);
                    }
                    else {
                        console.log('nothing found.?');
                        this.setState({ userData: null })
                        this.continueSignUp()
                }})
                .catch(() => {
                    console.log('error')
                });  
        }
        else {
            this.setState({ errorMessage: "Passwords do not match." })
        }
    }


    continueSignUp() {
        console.log("succesfully sent data here");
        if (this.state.userData == null) {
            console.log("running here too! :D");
            var removeSpaceEmail = this.state.email.replace(/\s+/g, '');
            firebase
                .auth()
                .createUserWithEmailAndPassword(removeSpaceEmail, this.state.password)
                .then((res) =>

                    firebase.database().ref('users/' + firebase.auth().currentUser.uid + '/').set({
                        username: this.state.username,
                        email: this.state.email,
                        usernamelowercase: this.state.username.toLowerCase()
                    }))
                .catch(error => this.setState({ errorMessage: error.message }))
            console.log("Potential Errors: " + this.state.errorMessage);
            if (this.state.errorMessage == '') {
                this.props.navigation.replace('tabs')
            }
        }
        firebase.auth().onAuthStateChanged(user => {
            console.log()
            this.props.navigation.navigate(user ? 'tabs' : 'SignUp')
        })
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
                    placeholder="Username"
                    placeholderTextColor="black"
                    autoCapitalize="none"
                    style={styles.textInput}
                    onChangeText={username => this.setState({ username })}
                    value={this.state.username}
                />
                <TextInput
                    style={styles.textInput}
                    placeholder="Email"
                    placeholderTextColor="black"
                    autoCapitalize="none"
                    style={styles.textInput}
                    onChangeText={email => this.setState({ email })}
                    value={this.state.email}
                />
                <TextInput
                    style={styles.textInput}
                    secureTextEntry
                    placeholder="Password"
                    placeholderTextColor="black"
                    autoCapitalize="none"
                    style={styles.textInput}
                    onChangeText={password => this.setState({ password })}
                    value={this.state.password}
                />
                <TextInput
                    style={styles.textInput}
                    secureTextEntry
                    placeholder="Confirm Password"
                    placeholderTextColor="black"
                    autoCapitalize="none"
                    style={styles.textInput}
                    onChangeText={cpassword => this.setState({ cpassword })}
                    value={this.state.cpassword}
                />
                <TouchableOpacity style={styles.buttonBlue}
                    title="Sign Up" onPress={this.handleSignUp} >
                    <Text style={{ fontWeight: 'bold', textAlign: 'center' }}>Register</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.buttonRed}
                    title="Already have an account? Login"
                    onPress={() => this.props.navigation.navigate('LoginScreen')}>
                    <Text style={{ fontWeight: 'bold', textAlign: 'center' }}>Already have an account? Login</Text>
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
        marginTop: 8
    },
    button: {
        padding: 15,
        backgroundColor: 'rgba(0,0,0, 0.1)',
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
    }
})