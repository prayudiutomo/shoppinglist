import React from 'react'
import {
  Text,
  View,
	ListView
} from 'react-native';
import ReactDOM from 'react-dom'
import { createStore } from 'redux'
import { Provider } from 'react-redux'
import { connect } from 'react-redux'
import Styles from '../assets/css/Styles';

// Actions
export const addProduct = (title) => ({
	type: 'ADD_PRODUCT',
	id: nextTodoId++,
	product: title,
});

export const editProduct = (id, product) => ({
	type: 'EDIT_PRODUCT',
	id: id,
	product: product
});

export const setHighlight = (id) => ({
	type: 'SET_HIGHLIGHT',
	id: id,
});

export const setEditable = (id) => ({
	type: 'SET_EDITABLE',
	id: id,
});

export const deleteProduct = (id) => ({
	type: 'DELETE_PRODUCT',
	id: id,
});

const initialState = {
	data:[{
		id: Math.floor(Math.random()*90000) + 10000,
		product: 'Apple Macbook',
		highlight: false,
		editable: false
	}]
}

class ShoppingList extends React.Component {
	// Initialize the hardcoded data
	constructor(props) {
    super(props);
    const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
    this.state = {
      dataSource: ds.cloneWithRows([
        'John', 'Joel', 'James', 'Jimmy', 'Jackson', 'Jillian', 'Julie', 'Devin'
      ])
    };
  }

	render() {
    return (
      <View style={{flex: 1, paddingTop: 22}}>
        <ListView
          dataSource={this.state.dataSource}
          renderRow={(rowData) => <Text>{rowData}</Text>}
        />
      </View>
    );
  }
}

//AppRegistry.registerComponent('shoppinglistrn', () => ShoppingList);

export default ShoppingList;
