import React from 'react';
import { View, Text, Button } from 'react-native';
import { createAppContainer, createStackNavigator, StackActions, NavigationActions } from 'react-navigation';
import LoginScreen from '../screens/LoginScreen'
import DashboardScreen from '../screens/DashboardScreen'


const AppNavigator = createStackNavigator({
  Login: {
    screen: LoginScreen,
  },
  Dashboard: {
    screen: DashboardScreen,
  },
}, {
    initialRouteName: 'Login',
    defaultNavigationOptions:{
      headerTransparent:true
    }
});

export default createAppContainer(AppNavigator);