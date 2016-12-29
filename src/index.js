import React from 'react'
import {
  Text,
  View
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
	constructor(props) {
		super(props);
	}

	render() {
		return (
			<View className="container">
				<View className="col-sm-6">
					<Text>Shopping List</Text>
				</View>
				<View className="col-sm-6">
					<VisibleProductList/>
				</View>
			</View>
		);
	}
}

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

class ProductList extends React.Component {
	constructor(props) {
		super(props);
	}

	render() {
		var productList = this.props.data.map(function (listItem) {
			return (
				<VisibleProductItem
					key={listItem.id}
					id={listItem.id}
					product={listItem.product}
					editable={listItem.editable}
					highlight={listItem.highlight}
				/>
			);
		},this);

		var numHighlight = this.props.data.reduce(function(count, item) {
			return count + (item["highlight"] === true ? 1 : 0);
		}, 0);

		var highlightNodes = this.props.data.map(function (listItem) {
			if(listItem.highlight) {
				return (
					listItem.product
					)
			}
			return;
		});

		return (
			<View>
				<ul className="listGroup">
					{productList}
				</ul>
				<View className="col-sm-6">
					<Text className="action total">Total: {this.props.data.length}</Text>
				</View>
				<View className="col-sm-6">
					<Text className="action highlight">Highlighted: {numHighlight}</Text>
				</View>

				<View className="highlightDetails">
					<Text className="order">Highlighted Item: {highlightNodes.filter(function(n){ return n !== undefined }).join(', ')}</Text>
				</View>
			</View>
		);
	}
}

const VisibleProductList = connect(
	mapStateToProps,
	mapDispatchToProps
)(ProductList)

class ProductItem extends React.Component {
	constructor(props) {
		super(props);
	}

	handleKeyDown(e) {
		if (e.keyCode === 13) {
			this.props.editProduct(this.props.id, this.refs.edit.value)
		}

		if (e.keyCode === 27) {
			this.props.setEditable(this.props.id)
		}
	}

	render() {
		return (
			<li className={(this.props.highlight)? 'row edit highlight':'row edit'} >
				<Text>{this.props.number} </Text>
				<Text className="itemName">
					{ this.props.editable ?
						<input type="text" ref="edit" defaultValue={this.props.product} onKeyDown={this.handleKeyDown.bind(this)} />
						:
						<label onClick={() => { this.props.setHighlight(this.props.id); }}>
							{this.props.product}
						</label>
					}
				</Text>
				<Text className="action" onClick={() => { (this.props.editable)? this.props.editProduct(this.props.id, this.refs.edit.value):this.props.setEditable(this.props.id); }}>
					{(this.props.editable) ? "Save" : "Edit"}
				</Text>
				<Text className="action" onClick={() => { this.props.deleteProduct(this.props.id); }}>Delete</Text>
			</li>
		);
	}
}

const VisibleProductItem = connect(
	mapStateToProps,
	mapDispatchToProps
)(ProductItem)

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
			<form onSubmit={this.doSubmit.bind(this)}>
				<Text><input type="text" id="product" ref="product" className="form-control" placeholder="Add product" /></Text>
				<Text><input type="submit" value="Add" className="btn" /></Text>
			</form>
		);
	}
}

const VisibleProductForm = connect(
	mapStateToProps,
	mapDispatchToProps
)(ProductForm)

const Root = () => (
  <Provider store={store}>
    <ShoppingList />
  </Provider>
)

//AppRegistry.registerComponent('shoppinglistrn', () => Root);

export default Root;

// let root =  document.getElementById('root');
//
// ReactDOM.render(
// 	<Provider store={store}>
// 		<ShoppingList />
// 	</Provider>,
// 	root
// )
