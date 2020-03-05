import React, { Component } from 'react';
import { View, KeyboardAvoidingView, ActivityIndicator, Dimensions, ScrollView, Text, StyleSheet, Switch, TouchableOpacity, Button, Alert, prompt, Modal } from 'react-native';
import firebase from './firebase';
import { TextInput } from 'react-native-gesture-handler';
import DialogInput from 'react-native-dialog-input';
const { width, height } = Dimensions.get('window');

// const firebase = firebase.database();
console.disableYellowBox = true;



export default class Profile extends Component {
    state = { loaded: null, username: '', currentUser: null, changeUsername: '', changed: null, errorMessage: null, publicEventsOnScreen: {} }
    testFunc() {
        //Public Events Grab
        firebase.database().ref('users/' + currentUser.uid + '/events/publicEvents').on('value', (PEidGrab) => {
            if (PEidGrab.exists()) {
                var publicEventsNum = 0
                var publicEventsGrab = []
                PEidGrab.forEach((child) => {
                    publicEventsGrab.push({
                        publicEventsGrabId: Object.keys(PEidGrab.val())
                    })

                    console.log("CURRENT ID: " + JSON.stringify(publicEventsGrab[0]))

                })

                var publicEventsToScreen = []
                var PELength = publicEventsGrab.length
                Object.keys(publicEventsGrab).map((id, PEindex) => {

                    firebase.database().ref('categories/publicEvents/' + publicEventsGrab[id].publicEventsGrabId[PEindex] + '/').on("value", (PEEvents) => {
                        if (PEEvents.exists()) {


                            publicEventsToScreen.push({
                                id: publicEventsGrab[id].publicEventsGrabId[PEindex],
                                date: PEEvents.val().date,
                                time: PEEvents.val().time,
                                endtime: PEEvents.val().endtime,
                                title: PEEvents.val().title,
                            })


                        }
                    });

                    this.setState({ publicEventsOnScreen: publicEventsToScreen })


                })

            }
        });
    }

    

    

    
    componentDidMount() {
        this._navListener = this.props.navigation.addListener('willFocus', () => {
            // this.setState({ username: 'user' });
            // get your new data here and then set state it will rerender
            const { currentUser } = firebase.auth()
            this.setState({ currentUser })
            this.setState({ errorMessage: null })

            firebase.auth().onAuthStateChanged(user => {
                console.log()
                this.props.navigation.navigate(user ? 'tabs' : 'LoginScreen')
            })
            firebase.database().ref('users/' + currentUser.uid + '/username').on('value', (snapshot) => {
                console.log(snapshot.val())
                let data = snapshot.val();
                let username = data;
                this.setState({ username });
                this.setState({ changeUsername: this.state.username })
                
            });
            

            

        });

        const { currentUser } = firebase.auth()
        this.setState({ currentUser })
        

        
    }

    changeUsername = () => {
        this.setState({changed: null, errorMessage: null})
        console.log("New Username: " + this.state.changeUsername);
        var removeSpaceUsername = this.state.changeUsername.replace(/\s+/g, '_');
        this.setState({changeUsername: removeSpaceUsername})
        firebase.database().ref().child(`users`).orderByChild('usernamelowercase').equalTo(removeSpaceUsername.toLowerCase()).once("value", snapshot => {
            if (snapshot.exists()) {
                this.setState({ userData: this.state.username, errorMessage: "Username is already taken." }, function () {
                    console.log("running... :/ VALUES: " + JSON.stringify(snapshot.val()))

                })
                userData = true
                console.log("user entered: " + this.state.username + " errormessage: " + this.state.errorMessage);
            }
            else if (this.state.changeUsername == '') {
                console.log("username empty!");
                this.setState({errorMessage: 'You cannot leave this field blank!'})
            }
            else {
                console.log('nothing found.?');
                this.setState({ userData: null })
                this.continueUsernameChange()
            }
        })
            .catch(() => {
                console.log('error')
            }); 

        
        
    }

    continueUsernameChange() {
        this.setState({errorMessage: null})
        firebase.database().ref('users/' + firebase.auth().currentUser.uid + '/').update({
            username: this.state.changeUsername,
            usernamelowercase: this.state.changeUsername.toLowerCase()
        })
            .catch(error => this.setState({ errorMessage: error.message }))
        // if (this.state.errorMessage == '') {
            this.setState({ changed: 'Username Succesfully Changed.' })
        // }
    }

   
    categoryPress = (category) => {
        console.log(category);
        this.props.navigation.push('ProfilePEEventsScreen', { selectedCategory: category })
    }

    

    render() {
       
        
        
       
        return (
            <View style={styles.container}>
                
                <Text style={styles.title}>{this.state.username}'s Profile</Text>
            <KeyboardAvoidingView style={styles.avoidingContainer} behavior="padding">
                

                {this.state.changed &&
                    <Text style={{ color: 'green' }}>
                        {this.state.changed}
                    </Text>}
                {this.state.errorMessage &&
                    <Text style={{ color: 'red' }}>
                        {this.state.errorMessage}
                    </Text>}
                <TextInput
                    style={styles.textInput}
                    autoCapitalize="none"
                    placeholder="enter new username..."
                    placeholderTextColor="black"
                    onChangeText={changeUsername => this.setState({ changeUsername })}
                    value={this.state.changeUsername}
                    onFocus={() => this.setState({ changeUsername: this.state.username })}
                />
                <TouchableOpacity style={styles.button}
                    title="Change Username" onPress={this.changeUsername} >
                    <Text style={{ fontWeight: 'bold', textAlign: 'center' }}>Change Username</Text>
                    </TouchableOpacity>
                   
                </KeyboardAvoidingView>
                
                <View style={styles.buttons}>
                    <Text style={{alignSelf: 'center'}}>View your added events by clicking on a category!</Text>
                <TouchableOpacity style={styles.button}
                    title="Back"
                    onPress={() => this.categoryPress("sports")}>
                    <Text style={{ fontWeight: 'bold', textAlign: 'center' }}>Sports</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.button}
                    title="Back"
                    onPress={() => this.categoryPress("publicEvents")}>
                    <Text style={{ fontWeight: 'bold', textAlign: 'center' }}>Public Events</Text>
                </TouchableOpacity>
                
                <TouchableOpacity style={styles.button}
                    title="Back"
                    onPress={() => this.categoryPress("tabletop")}>
                    <Text style={{ fontWeight: 'bold', textAlign: 'center' }}>Tabletop</Text>
                    </TouchableOpacity>
                </View>
            </View>
            

        );
    }
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
        top: 0,
    },
    avoidingContainer: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
        top: 50,
        position: 'absolute',
        paddingBottom: 30,
        
    },
    divider: {
        borderBottomWidth: 2,
        width: '100%',
        marginBottom: 20,
        paddingBottom: 20,
        top: 200,
        position: 'absolute',
        zIndex: 100000,
    },
    titleText: {
        fontSize: 30,
    },
    padding: {
        padding: 10,
    },
    TextInput: {
        backgroundColor: 'grey',
        height: 20,
        width: '100%',
        marginBottom: 30,
        textAlign: "center"
    },
    title: {
        fontSize: 30,
        top: 0,
        position: "absolute",
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
        marginTop: 5,
        width: width - 50,
        // top: 20,
    },
    scrollView: {
        // zIndex: 10000,
        top: 100,
    },
    event: {
        margin: 15,
        backgroundColor: 'lightgrey',
        borderWidth: 1,
        borderRadius: 10,
        width: width - 50,
        height: 100,
        paddingLeft: 10,
        paddingTop: 10,
        alignSelf: 'center'
    },
    eventRemove: {
        width: 150,
        padding: 5,
        borderWidth: 1,
        borderRadius: 5,
        backgroundColor: 'red',
        marginTop: 10,

    },
    eventRemoveText: {
        alignSelf: 'center',
    },
    buttons: {
        bottom: 0,
        marginTop: 5,
        position: 'absolute',
        marginBottom: 50,
    }
});