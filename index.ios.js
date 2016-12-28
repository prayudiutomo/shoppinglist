/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View
} from 'react-native';

import ShoppingList from './src';

export default class shoppinglistrn extends Component {
  render() {
    return (
      <ShoppingList/>
    );
  }
}

AppRegistry.registerComponent('shoppinglistrn', () => shoppinglistrn);
