import React from 'react'
import {
  Text,
  View,
	ListView,
	StyleSheet
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

	renderList() {
		return <ListView
			dataSource={this.state.dataSource}
			renderRow={(rowData) => (
					<Text>{rowData} Delete Edit</Text>
				)
			}
		/>
	}

	render() {
		console.log(this.state)
    return (
      <View style={styles.container}>
        {this.renderList()}
      </View>
    );
  }
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		paddingTop: 22,
	}
});

export default ShoppingList;
