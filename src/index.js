import React from 'react'
import {
  Text,
  View,
	ListView,
	StyleSheet,
	TextInput,
	TouchableOpacity
} from 'react-native';
import ReactDOM from 'react-dom'
import { createStore } from 'redux'
import { Provider } from 'react-redux'
import { connect } from 'react-redux'

let nextTodoId = 0

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

// Reducers
const numberReducer = (state = initialState, action) => {
	switch (action.type) {
		case 'ADD_PRODUCT':
			const newProduct = {
				id: action.id,
				product: action.product,
				highlight: false,
				editable: false
			};

			return { data: [...state.data, newProduct] }

		case 'EDIT_PRODUCT':
			return { data: state.data.map(item => item.id === action.id ?
				Object.assign({}, item, {product: action.product, editable: !item.editable}) : item) }
		case 'SAVE_PRODUCT':
			return {...state, id: action.id};

		case 'SET_HIGHLIGHT':
			return { data: state.data.map(item => item.id === action.id ?
				Object.assign({}, item, {highlight: !item.highlight}) : item) }

		case 'SET_EDITABLE':
			return { data: state.data.map(item => item.id === action.id ?
				Object.assign({}, item, {editable: !item.editable}) : item) }

		case 'DELETE_PRODUCT':
			return { data: state.data.filter((v) => v.id !== action.id)}
		default:
			return state
	}
}

let store = createStore(numberReducer);

const mapStateToProps = (state) => ({
	data: state.data
})

const mapDispatchToProps =  ({
	setEditable: setEditable,
	setHighlight: setHighlight,
	addProduct: addProduct,
	editProduct: editProduct,
	deleteProduct: deleteProduct
})

const Header = () => {
	return <Text>Shopping List</Text>
}

class ProductForm extends React.Component {
	constructor(props) {
		super(props);
	}

	doSubmit(e) {
		e.preventDefault();
		this.props.addProduct(this.refs.product.value);
		this.refs.product.value = '';
		return;
	}

	render() {
		return (
			<View>
				<TextInput
					id="product" ref="product"
	        style={styles.form}
	      />
				<Button onPress={this.doSubmit.bind(this)}/>
			</View>
		);
	}
}

const VisibleProductForm = connect(
	mapStateToProps,
	mapDispatchToProps
)(ProductForm)

const Button = ({ onPress, text }) => {
	return (
		<TouchableOpacity onPress={onPress}>
			<Text style={styles.button}>Add</Text>
		</TouchableOpacity>
	);
}

const Footer = () => {
	return (
		<View>
			<Text>Highlighted: 1</Text>
			<Text>Total: 1</Text>
			<Text>Highlighted Item: Macbook Pro</Text>
		</View>
	);
}

class ProductList extends React.Component {
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
		return <ListView
			dataSource={this.state.dataSource}
			renderRow={(rowData) => (
					<Text className={styles.textList}>{rowData} Delete Edit</Text>
				)
			}
		/>
	}
}

class ShoppingList extends React.Component {
	constructor(props) {
    super(props);
	}

	render() {
		console.log(this.state)
    return (
			<Provider store={store}>
	      <View style={styles.container}>
					<Header/>
					<ProductForm/>
					<ProductList/>
					<Footer/>
	      </View>
			</Provider>
    );
  }
}

const styles = StyleSheet.create({
	container: {
		paddingTop: 22
	},
	textList: {
		fontSize: 16
	},
	form: {
		height: 40,
		borderColor: 'gray',
		borderWidth: 1
	},
	button: {
		backgroundColor: '#efefef',
		borderWidth: 1,
		borderColor: '#eaeaea'
	}
});

export default ShoppingList;
