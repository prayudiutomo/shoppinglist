import React from 'react'
import {
  Text,
  View,
	ListView,
	StyleSheet,
	TextInput
} from 'react-native';
import ReactDOM from 'react-dom'
import { createStore } from 'redux'
import { Provider } from 'react-redux'
import { connect } from 'react-redux'
import Styles from '../assets/css/Styles';

const Header = () => {
	return <Text>Shopping List</Text>
}

const Form = () => {
	return (
		<View>
			<TextInput
        style={{height: 40, borderColor: 'gray', borderWidth: 1}}
        onChangeText={(text) => this.setState({text})}
      />
		<Text>Add</Text>
		</View>
	)
}

const Footer = () => {
	return (
		<View>
			<Text>Highlighted: 1</Text>
			<Text>Total: 1</Text>
			<Text>Highlighted Item: Macbook Pro</Text>
		</View>
	)
}

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
				<Header/>
				<Form/>
        {this.renderList()}
				<Footer/>
      </View>
    );
  }
}

const styles = StyleSheet.create({
	container: {
		paddingTop: 22,
	}
});

export default ShoppingList;
