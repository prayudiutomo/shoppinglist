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

class ShoppingList extends React.Component {
	// Initialize the hardcoded data
	constructor(props) {
    super(props);
    const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
    this.state = {
      dataSource: ds.cloneWithRows([
        'Macbook Pro', 'iPad', 'iPhone', 'Samsung Galaxy', 'Lenovo Note', 'Xiaomi', 'Sony XPeria', 'Blackberry'
      ])
    };
  }

	render() {
    return (
      <View style={{flex: 1, paddingTop: 22}}>
        <ListView
          dataSource={this.state.dataSource}
          renderRow={(rowData) => <Text>{rowData} Delete Edit</Text>}
        />
      </View>
    );
  }
}

export default ShoppingList;
