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
});

export default createAppContainer(AppNavigator);