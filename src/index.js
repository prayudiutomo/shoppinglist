import React from 'react'
import ReactDOM from 'react-dom'
import { createStore } from 'redux'
import { Provider } from 'react-redux'
import { connect } from 'react-redux'
import styles from '../assets/css/custom.css'

let nextTodoId = 0

// Actions
export const increaseNumberBy1 = (number) => ({
	type: 'INCREASE_NUMBER_BY_1',
	number: number,
});

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

class ShoppingList extends React.Component {
	constructor(props) {
		super(props);
	}

	render() {
		return (
			<div className="container">
				<div className="col-sm-6">
					<VisibleProductList />
				</div>
			</div>
		);
	}
}

const mapStateToProps = (state) => ({
	data: state.data
})

const mapDispatchToProps =  ({
	increaseNumberBy1: increaseNumberBy1,
	setEditable: setEditable,
	setHighlight: setHighlight,
	addProduct: addProduct,
	editProduct: editProduct,
	deleteProduct: deleteProduct
})

const VisibleShoppingList = connect(
	mapStateToProps,
	mapDispatchToProps
)(ShoppingList)

class ProductList extends React.Component {
	constructor(props) {
		super(props);
	}

	render() {
		var listNodes = this.props.data.map(function (listItem) {
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
			<ul className="list-group">
				<li className="row captions">
					<h2>Shopping List</h2>
				</li>
				<li className="row captions">
					<VisibleProductForm />
				</li>
				{listNodes}
				<li className="row totals">
					<span className="action total">Total: {this.props.data.length}</span>
					<span className="order highlight">Highlighted: {numHighlight}</span>
				</li>
				<li className="highlightDetails">
					<span className="order">Highlighted Item: {highlightNodes.filter(function(n){ return n !== undefined }).join(', ')}</span>
				</li>
			</ul>
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

	render() {
		if (this.props.highlight) {
			var className = 'row edit highlight';
		} else {
			var className = 'row edit';
		}

		return (
			<li className={className} >
				<span>{this.props.number} </span>
				<span className="itemName">
					{ this.props.editable ?
						<input type="text" defaultValue={this.props.product} ref="edit"/>
						:
						<label onClick={() => { this.props.setHighlight(this.props.id); }}>
							{this.props.product}
						</label>
					}
				</span>
				<span className="action" onClick={() => { (this.props.editable)? this.props.editProduct(this.props.id, this.refs.edit.value):this.props.setEditable(this.props.id); }}>
					{(this.props.editable) ? "Save" : "Edit"}
				</span>
				<span className="action" onClick={() => { this.props.deleteProduct(this.props.id); }}>Delete</span>
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
			<span><input type="text" id="product" ref="product" className="form-control" placeholder="Add product" /></span>
			<span><input type="submit" value="Add" className="btn" /></span>
			</form>
			);
	}
}

const VisibleProductForm = connect(
	mapStateToProps,
	mapDispatchToProps
)(ProductForm)

let root =  document.getElementById('root');

ReactDOM.render(
	<Provider store={store}>
	<VisibleShoppingList />
	</Provider>,
	root
	)
