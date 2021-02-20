import React, {Component} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import { Provider } from 'react-redux';
import ReduxThunx from 'redux-thunk';
import { applyMiddleware, createStore } from 'redux';

import reducers from './src/redux/reducers';
import Container from './src/navigations/AppNavigator';

export default class App extends Component {
  render() {
    return (
      <Provider store={createStore(reducers,{},applyMiddleware(ReduxThunx))}>
        <Container/>
      </Provider>
    );
  }
}

const styles = StyleSheet.create({
 
});
