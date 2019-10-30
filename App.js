import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import InputScreen from './components/InputScreen';
import DetailScreen from './components/InputDetails';
import LoginScreen from './components/LoginScreen';
import LoadingScreen from './components/LoadingScreen';

const RootStack = createStackNavigator(
  {
    Input: InputScreen,
    Details: DetailScreen,
    Login: LoginScreen,
    Loading: LoadingScreen,
  },
  {
    initialRouteName: 'Login',
    navigationOptions: {
      headerStyle: {
        backgroundColor: '#777777',
      },
      headerTintColor: '#fff',
      headerTitleStyle: {
        fontWeight: 'bold',
      },
    },
  },
);

const AppContainer = createAppContainer(RootStack);

class App extends React.Component {
  render() {
    return <AppContainer />;
  }
}

export default App;