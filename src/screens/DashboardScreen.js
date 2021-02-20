import React, {Component} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {useSelector } from 'react-redux';
export default class DashboardScreen extends React.Component {
  render() {
    return (
      <View style={{flex:1,justifyContent:'center',alignItems:'center'}}>
        <Text style={{color:'#d53'}}>Dashboard Screen</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
 
});