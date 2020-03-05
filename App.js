import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import React, { Component } from 'react';
import { View, Button, Text, Image, StyleSheet } from 'react-native'; 





import LoginScreen from './login';
import Tabs from './tabs';
import Drawer from './drawer';
import Loading from './loading';
import SignUp from './signup';
import firebase from './firebase';
import Passreset from './passreset';
import CategoryScreen from './category';
import ProfilePEEventsScreen from './ProfilePEEventsScreen'
import Animated from 'react-native-reanimated';
import { create } from 'uuid-js';
import { Updates } from 'expo';
import { TouchableOpacity } from 'react-native-gesture-handler';





class LogoTitle extends Component {
  render() {
    return (
      <Image
        source={require('./assets/vurtuosoLogo.png')}
        style={{ width: 40, height: 40, left: 10 }}
      />
    );
  }
}

const stackNavigator = createStackNavigator({

  Login: {
    screen: Loading,
  },
  LoginScreen: {
    navigationOptions: ({ navigation }) => {
      return {
        gesturesEnabled: false,
        headerMode: 'screen',
        headerTintColor: '#fff',
        headerTitleStyle: {
          fontWeight: 'bold',
        },
        headerLeft: <LogoTitle />,
        title: 'Virtuoso | Log In',
        headerRight: (
          
          <TouchableOpacity style={styles.headerButton} onPress={() => { alert("Hello! Welcome to the official Virtuoso app! to use this app, you must be signed in. you may create an account using the signup page, and then login here! Thanks for using Virtuoso!") }}>
            <Text style={{ color: "white", fontWeight: 'bold' }}>App Info</Text>
          </TouchableOpacity>
        ),
        headerStyle: {
          backgroundColor: '#35B74B',
        },
      }
    },
    screen: LoginScreen,
  },
  SignUp: {
    navigationOptions: ({ navigation }) => {
      return {
        gesturesEnabled: true,
        headerMode: 'screen',
        headerTintColor: '#fff',
        headerTitleStyle: {
          fontWeight: 'bold',
        },
        headerLeft: <LogoTitle />,
        title: 'Virtuoso | Register',
        headerRight: (
          <TouchableOpacity style={styles.headerButton} onPress={() => { alert("Hello! Welcome to the official Virtuoso app! to use this app, you must be signed in. you may create an account using the signup page, and then login here! Thanks for using Virtuoso!") }}>
            <Text style={{ color: "white", fontWeight: 'bold' }}>App Info</Text>
          </TouchableOpacity>

        ),
        headerStyle: {
          backgroundColor: '#35B74B',
        },
      }
    },
    screen: SignUp,
  },
  PasswordReset: {
    navigationOptions: ({ navigation }) => {
      return {
        gesturesEnabled: true,
        headerMode: 'screen',
        headerTintColor: '#fff',
        headerTitleStyle: {
          fontWeight: 'bold',
        },
        headerLeft: <LogoTitle />,
        title: 'Reset Password',
        headerRight: (
          <TouchableOpacity style={styles.headerButton} onPress={() => { alert("Hello! Welcome to the official Virtuoso app! to use this app, you must be signed in. you may create an account using the signup page, and then login here! Thanks for using Virtuoso!") }}>
            <Text style={{ color: "white", fontWeight: 'bold' }}>App Info</Text>
          </TouchableOpacity>

        ),
        headerStyle: {
          backgroundColor: '#35B74B',
        },
      }
    },
    screen: Passreset,
  },
  Category: {
    navigationOptions: ({ navigation }) => {
      return {
        gesturesEnabled: true,
        headerMode: 'screen',
        headerTintColor: '#fff',
        headerTitleStyle: {
          fontWeight: 'bold',
        },
        headerLeft: <LogoTitle />,
        title: 'Virtuoso | Categories',
        headerRight: (

          <TouchableOpacity style={styles.headerButton} onPress={() => { firebase.auth().signOut() }}>
            <Text style={{ color: "white", fontWeight: 'bold' }}>Log Out</Text>
          </TouchableOpacity>
        ),
        headerStyle: {
          backgroundColor: '#35B74B',
        },
      }
    },
    screen: CategoryScreen,
  },
  ProfilePEEventsScreen: {
    navigationOptions: ({ navigation }) => {
      return {
        gesturesEnabled: true,
        headerMode: 'screen',
        headerTintColor: '#fff',
        headerTitleStyle: {
          fontWeight: 'bold',
        },
        headerLeft: <LogoTitle />,
        title: 'Virtuoso | Profile Events',
        headerRight: (

          <TouchableOpacity style={styles.headerButton} onPress={() => { firebase.auth().signOut() }}>
            <Text style={{ color: "white", fontWeight: 'bold' }}>Log Out</Text>
          </TouchableOpacity>
        ),
        headerStyle: {
          backgroundColor: '#35B74B',
        },
      }
    },
    screen: ProfilePEEventsScreen,
  },
  tabs: {
    navigationOptions: ({ navigation }) => {
      return {
        headerMode: 'screen',
        headerTintColor: '#fff',
        headerTitleStyle: {
          fontWeight: 'bold',
        },
        headerLeft: <LogoTitle />,
        title: 'Virtuoso',
        headerRight: (
          
          <TouchableOpacity style={styles.headerButton} onPress={() => { firebase.auth().signOut() }}>
            <Text style={{ color: "white", fontWeight: 'bold' }}>Log Out</Text>
          </TouchableOpacity> 
        ),
        headerStyle: {
          backgroundColor: '#35B74B',
        },
      }},
    screen: Tabs
  },
  drawer: {
    navigationOptions: ({ navigation }) => {
      return {
        headerMode: 'screen',
        headerTintColor: '#fff',
        headerTitleStyle: {
          fontWeight: 'bold',
        },
        headerLeft: <LogoTitle />,
        title: 'Virtuoso',
        headerRight: (
          
          <TouchableOpacity style={styles.headerButton} onPress={() => { firebase.auth().signOut() }}>
            <Text style={{ color: "white", fontWeight: 'bold' }}>Log Out</Text>
          </TouchableOpacity> 
        ),
        headerStyle: {
          backgroundColor: '#35B74B',
        },
      }},
    screen: Drawer
  }
},
  {
    headerMode: 'screen', // remove top bar and make full screen
    headerTransparent: true,
    navigationOptions: {
      headerVisible: true,
    },
    defaultNavigationOptions: { // remove swipe back gesture
      gesturesEnabled: false,
      headerLeft: null,
      headerMode: 'none'
    }}
)

const styles = StyleSheet.create({
  headerButton: {
    padding: 10,
    alignItems: 'center',
    textAlign: 'center',
    justifyContent: 'center',
    alignContent: 'center',
    backgroundColor: '#008200',
    margin: 5,
    // right: 10,
  }
})


export default createAppContainer(stackNavigator)


