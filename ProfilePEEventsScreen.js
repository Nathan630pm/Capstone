import React, { Component } from 'react';
import { View, KeyboardAvoidingView, ActivityIndicator, Dimensions, ScrollView, Text, StyleSheet, Switch, TouchableOpacity, Button, Alert, prompt, Modal } from 'react-native';
import firebase from './firebase';
import { TextInput } from 'react-native-gesture-handler';
import DialogInput from 'react-native-dialog-input';
const { width, height } = Dimensions.get('window');

// const firebase = firebase.database();
console.disableYellowBox = true;

export default class ProfilePEEventsScreen extends Component {
    state = { itemIDs: {}, categorySelected: '', loaded: null, username: '', currentUser: null, changeUsername: '', changed: null, errorMessage: null, publicEventsOnScreen: {}, SPORTSOnScreen: {} }
    componentDidMount() {

        
        var categoryRecieved;
        this._navListener = this.props.navigation.addListener('willFocus', () => {
            categoryRecieved = this.props.navigation.getParam('selectedCategory')
            this.setState({ categorySelected: categoryRecieved })
            setTimeout(() => {
                this.getData(categoryRecieved)
                console.log("waited 5 seconds...")
                this.setState({ loaded: true })
            }, 3000)
            // this.setState({ username: 'user' });
            // get your new data here and then set state it will rerender
            const { currentUser } = firebase.auth()
            this.setState({ currentUser })
            this.setState({ errorMessage: null })

            firebase.auth().onAuthStateChanged(user => {
                console.log()
                this.props.navigation.navigate(user ? '' : 'LoginScreen')
            })

            
            this.getData(categoryRecieved)
            

            

        });

        const { currentUser } = firebase.auth()
        this.setState({ currentUser })
        



    }

    removeFromProfile = (removeId) => {
        const { currentUser } = firebase.auth()
        this.setState({ currentUser })
        console.log(removeId);
        var removeIDFix = removeId.replace(/\"/g, '');
        firebase.database().ref('users/' + currentUser.uid + '/events/' + this.state.categorySelected + '/' + removeIDFix).remove();
    }





    getData = (category) => {
        const { currentUser } = firebase.auth()
        this.setState({ currentUser })
        //Public Events Grab
        firebase.database().ref('users/' + currentUser.uid + '/events/' + category + '/').on('value', (PEidGrab) => {
            if (PEidGrab.exists()) {
                var publicEventsNum = 0
                var publicEventsGrab = []
                PEidGrab.forEach((child) => {
                    publicEventsGrab.push({
                        publicEventsGrabId: Object.keys(PEidGrab.val())
                    })

                    console.log("CURRENT ID: " + Object.keys(PEidGrab.val()))
                    this.setState({itemIDs: Object.keys(PEidGrab.val())})

                })

                var publicEventsToScreen = []
                Object.keys(publicEventsGrab).map((id, PEindex) => {
                    // var eventID = publicEventsGrab[0].publicEventsGrabId[0]
                    console.log("ID?" + JSON.stringify(publicEventsGrab[id].publicEventsGrabId[PEindex]))
                    var eventID = JSON.stringify(publicEventsGrab[id].publicEventsGrabId[PEindex])
                    firebase.database().ref('categories/' + category + '/' + publicEventsGrab[id].publicEventsGrabId[PEindex] + '/').on("value", (PEEvents) => {
                        if (PEEvents.exists()) {


                            publicEventsToScreen.push({
                                id: eventID,
                                date: PEEvents.val().date,
                                time: PEEvents.val().time,
                                endtime: PEEvents.val().endtime,
                                title: PEEvents.val().title,
                            })


                        }
                    });
                    this.setState({ publicEventsOnScreen: publicEventsToScreen })
                    console.log("STATE: " + JSON.stringify(this.state.publicEventsOnScreen))
                    // console.log("STATE2: " + this.state.publicEventsOnScreen[0].id[0])


                })
                // this.setState({ loaded: true })

            }




        });


        

       

    }
    
    
        




    // }

    render() {
        var whileLoading;
        if (this.state.loaded == false) {
            whileLoading = <View><ActivityIndicator style={styles.loading} size="large" /><Text style={{ alignSelf: 'center' }}>Reloading Data...</Text></View>;
        }
        else {
            whileLoading = null;
        }


        var whileLoading;
        if (this.state.loaded == null) {
            whileLoading = <View><ActivityIndicator style={styles.loading} size="large" /><Text style={{ alignSelf: 'center' }}>Reloading Data...</Text></View>;
        }
        else {
            whileLoading = null;
        }
        return (
            <View style={styles.container}>
                <Text style={styles.titleText}>{this.state.categorySelected.charAt(0).toUpperCase() + this.state.categorySelected.slice(1)} Events on your profile:</Text>

                

                <ScrollView style={styles.scrollView}>

                    {whileLoading}
                    {Object.keys(this.state.publicEventsOnScreen).map((publicEventsToScreen, index) => {

                        return (
                            <View
                                isReady={this.state.publicEventsOnScreen}
                                style={styles.event}
                                key={index}
                            >
                                <Text>{this.state.publicEventsOnScreen[publicEventsToScreen].title}</Text>
                                <Text>Date: {this.state.publicEventsOnScreen[publicEventsToScreen].date}</Text>
                                <Text>Time: {this.state.publicEventsOnScreen[publicEventsToScreen].time} - {this.state.publicEventsOnScreen[publicEventsToScreen].endtime}</Text>
                                <TouchableOpacity
                                    style={styles.eventRemove}
                                    key={index}
                                    onPress={() => this.removeFromProfile(this.state.publicEventsOnScreen[publicEventsToScreen].id)}
                                >
                                    <Text style={styles.eventRemoveText}>Remove event from profile</Text>
                                </TouchableOpacity>
                            </View>
                        )
                    })}

                    <Text style={{color: 'white', margin: 20}}>*THIS IS A SPACER*</Text>
                </ScrollView>
                
                <View style={styles.buttons}>
                <TouchableOpacity style={styles.button}
                    title="Back"
                    onPress={() => this.getData()}>
                    <Text style={{ fontWeight: 'bold', textAlign: 'center' }}>Not Loading? Click Me To Refresh!</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.buttonRed}
                    title="Back"
                    onPress={() => this.props.navigation.goBack()}>
                    <Text style={{ fontWeight: 'bold', textAlign: 'center' }}>Choose Another Category...</Text>
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
        alignSelf: 'center',
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
        marginTop: 0,
        width: width - 50,
        alignSelf: 'center',
        marginTop: 10
    },
    buttonRed: {
        backgroundColor: "red",
        padding: 15,
        // backgroundColor: 'rgba(0,0,0, 0.1)',
        borderWidth: 1,
        borderRadius: 10,
        marginTop: 0,
        width: width - 50,
        marginTop: 10,
        alignSelf: 'center',
        marginBottom: 10
    },
    scrollView: {
        // zIndex: 10000,
        top: 30,
        
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
        width: width - 70,
        padding: 5,
        borderWidth: 1,
        borderRadius: 5,
        backgroundColor: 'red',
        marginTop: 10,
        textAlign: 'center',

    },
    eventRemoveText: {
        alignSelf: 'center',
    },
    buttons: {
        bottom: 0,
        // marginTop: 5,
        backgroundColor: 'darkgray',
        width: '100%',
        alignSelf: 'center'

    }
});