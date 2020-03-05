import React, { Component } from 'react';
import { createDrawerNavigator } from 'react-navigation-drawer';
import { View, TabBarIcon,  KeyboardAvoidingView, Dimensions, Text, StyleSheet, Switch, TouchableOpacity, Button, Alert, prompt, Modal } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

import HomeScreen from './home';
import NewEventScreen from './newevent';
import Profile from './profile';
import DrawScreen from './draw';





export default createDrawerNavigator({
    Home: { screen: HomeScreen },
    NewEventScreen: { screen: NewEventScreen },
    Profile: { screen: Profile },
    DrawScreen: { screen: DrawScreen },
    
    })
