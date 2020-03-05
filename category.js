import React, { Component } from 'react';
import { View, Text, StyleSheet, ActivityIndicator, Dimensions, TouchableOpacity, Image, Animated } from 'react-native';
import firebase from './firebase';
import { ScrollView } from 'react-native-gesture-handler';
const { width, height } = Dimensions.get('window');
export default class AboutScreen extends Component {
    state = { categorySelected: '', errorMessage: null, events: {}, userId: '', loaded: false }
    
    componentDidMount() {
        var categoryRecieved;
        this._navListener = this.props.navigation.addListener('willFocus', () => {
            categoryRecieved = this.props.navigation.getParam('selectedCategory')
            console.log("Selected Category: " + categoryRecieved)
            this.setState({ categorySelected: categoryRecieved, userID: '' })

            const { currentUser } = firebase.auth()


            this.setState({ errorMessage: null, userId: currentUser })
            firebase.database().ref(`categories/` + categoryRecieved + '/').on("value", snapshot => {
                
                if (snapshot.exists()) {
                    console.log(JSON.stringify(snapshot))
                    var events = [];
                    snapshot.forEach((child) => {
                        events.push({
                            id: Object.keys(snapshot.val()),
                            date: child.val().date,
                            time: child.val().time,
                            endtime: child.val().endtime,
                            title: child.val().title,
                        })
                    })
                    this.setState({loaded: true})
                    console.log("events: " + JSON.stringify(events))
                    console.log("date: " + events[0].date)
                    console.log("enttime: " + events[0].endtime)
                    console.log("ID: " + JSON.stringify(events[0].id))
                    this.setState({ events: events })
                }
            })
            
        });

        
    }
    addToProfile = (id) => {
        console.log(id);
        firebase.database().ref('users/' + this.state.userId.uid + '/events/' + this.state.categorySelected + '/' + id).set({
            added: 'true',
        });
    }

    render() {
        var whileLoading;
        if (this.state.loaded == false) {
            whileLoading = <View><ActivityIndicator style={styles.loading} size="large" /><Text style={{alignSelf: 'center'}}>Loading...</Text></View>;
        }
        else {
            whileLoading = null;
        }
        return (
            <View style={styles.container}>
                <Text style={styles.titleText}>Category: {this.state.categorySelected.charAt(0).toUpperCase() + this.state.categorySelected.slice(1)}</Text>
                
                    {whileLoading}
                
                <ScrollView style={styles.scrollView}>
                {Object.keys(this.state.events).map((events, index) => {
                    return (
                        <View
                            style={styles.event}
                            key={index}
                        >
                            <Text>{this.state.events[events].title}</Text>
                            <Text>Date: {this.state.events[events].date}</Text>
                            <Text>Time: {this.state.events[events].time} - {this.state.events[events].endtime}</Text>
                            <TouchableOpacity
                                style={styles.eventAdd}
                                key={index}
                                onPress={() => this.addToProfile(this.state.events[events].id[index])}
                            >
                                <Text style={styles.eventAddText}>Add event to profile</Text>
                            </TouchableOpacity>
                        </View>
                    )
                })}
                    
                    <Text style={styles.padding}>PADDING</Text>
                </ScrollView>
                <View style={styles.buttons}>
                <TouchableOpacity style={styles.buttonRed}
                    title="Back"
                    onPress={() => this.props.navigation.goBack()}>
                    <Text style={{ fontWeight: 'bold', textAlign: 'center' }}>Pick Another Category</Text>
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
        justifyContent: 'center'
    },
    titleText: {
        fontSize: 30,
    },
    padding: {
        padding: 10,
        color: 'white',
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
    scrollView: {
        top: 50,
        backgroundColor: 'rgba(52, 52, 52, 0.0)',
    },
    eventAdd: {
        padding: 5,
        borderWidth: 1,
        borderRadius: 5,
        backgroundColor: '#00A600',
        marginTop: 10,
        width: width - 70,

    },
    eventAddText: {
        alignSelf: 'center',
    },
    buttonRed: {
        backgroundColor: "red",
        padding: 15,
        // backgroundColor: 'rgba(0,0,0, 0.1)',
        borderWidth: 1,
        borderRadius: 10,
        marginTop: 20,
        width: width - 50,
        bottom: 10,
        alignSelf: 'center'
    },
    loading: {
        alignSelf: 'center',
        paddingTop: 200,
    },
    buttons: {
        bottom: 0,
        // marginTop: 5,
        backgroundColor: 'darkgray',
        width: '100%',
        alignSelf: 'center'

    }
});