import React from 'react'
import ReactDOM from 'react-dom'
import { createStore } from 'redux'
import { Provider } from 'react-redux'
import { connect } from 'react-redux'

// Actions
export const increaseNumberBy1 = (number) => ({
  type: 'INCREASE_NUMBER_BY_1',
  number: number,
});

// Reducers
const numberReducer = (state = {number: 0}, action) => {
  switch (action.type) {
    case 'INCREASE_NUMBER_BY_1':
      return {number: action.number + 1};
    default:
      return state
  }
}

// number
let store = createStore(numberReducer);

class ShoppingList extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			data: [
				{
					"id":"01",
					"product":"iPhone 7",
					"highlight":false,
					"editable":false

				},
				{
					"id":"02",
					"product":"Macbookddd Pro",
					"highlight":false,
					"editable":false
				},
				{
					"id":"03",
					"product":"iPad",
					"highlight":false,
					"editable":false
				}
			]
		};
	}

	generateId() {
		return Math.floor(Math.random()*90000) + 10000;
	}

	handleItemUpdated(nodeId, product) {
		var data = this.state.data;
		var result = data.filter(function(v) {
			return v.id === nodeId;
		});

		result[0].product = product;
		result[0].editable = false;

		this.setState({data})
	}

	handleItemRemoval(nodeId) {
		var data = this.state.data;
		data = data.filter(function (el) {
			return el.id !== nodeId;
		});

		this.setState({data});

		return;
	}

	handleItemAdd(product) {
		var newItem = this.state.data;
		newItem.push({
			id: this.generateId().toString(),
			product: product,
			highlight: false,
			editable: false
		});

		this.setState({newItem})
	}

	handleHightlight(nodeId) {
		var data = this.state.data;
		var result = data.filter(function(v) {
			return v.id === nodeId;
		});

		if (result[0].highlight == false) {
	   		result[0].highlight = true;
		} else {
	   		result[0].highlight = false;
		}

		this.setState({data})
	}

	handleEditable(nodeId) {
		var data = this.state.data;
		var result = data.filter(function(v) {
			return v.id === nodeId;
		});

		if (result[0].editable == false) {
	   		result[0].editable = true;
		} else {
	   		result[0].editable = false;
		}

		this.setState({data})
	}

	render() {
		return (
			<div className="container">
				<div>{this.props.number}</div>
				<button onClick={() => {
						this.props.increaseNumberBy1(this.props.number);
					}}>Increase</button>
				<div className="col-sm-6">
					<ProductList
						data={this.state.data}
						editable={this.state.editable}
						handleEditable={this.handleEditable.bind(this)}
						removeItem={this.handleItemRemoval.bind(this)}
						updateItem={this.handleItemUpdated.bind(this)}
						updateHightlight={this.handleHightlight.bind(this)}
						addItem={this.handleItemAdd.bind(this)}
					/>
				</div>
			</div>
		);
	}
}

const mapStateToProps = (state) => ({
  number: state.number,
})

const mapDispatchToProps =  ({
  increaseNumberBy1: increaseNumberBy1,
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
					nodeId={listItem.id}
					product={listItem.product}
					highlight={listItem.highlight}
					editable={listItem.editable}
					handleEditable={this.props.handleEditable.bind(this)}
					removeItem={this.props.removeItem.bind(this)}
					updateItem={this.props.updateItem.bind(this)}
					updateHightlight={this.props.updateHightlight.bind(this)}
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
				<ProductForm addItem={this.props.addItem.bind(this)} />
				</li>
				{listNodes}
				<li className="row totals">
					<span className="action total">Total: {this.props.data.length}</span>
					<span className="order highlight">Highlighted: {numHighlight}</span>
				</li>
				<li className="highlightDetails">
					<span className="order">Highlighted Item: {highlightNodes.filter(function(n){ return n != undefined }).join(', ')}</span>
				</li>
			</ul>
		);
	}
}

class ProductItem extends React.Component {
	constructor(props) {
		super(props);
		this.state = { text: '' };
	}

	updateItem(e) {
		this.props.updateItem(this.props.nodeId, this.refs.edit.value);
	}

	removeItem(e) {
		e.preventDefault();
		this.props.removeItem(this.props.nodeId);
		return;
	}

	handleEditable(e) {
		e.preventDefault();
		this.props.handleEditable(this.props.nodeId);
		return;
	}

	updateHightlight(e) {
		this.props.updateHightlight(this.props.nodeId);
	}

	render() {

		if (this.props.highlight) {
			var className = 'row edit highlight';
		} else {
			var className = 'row edit';
		}

		return (
			<li
				className={className} >
				  <span>{this.props.number} </span>
					<span className="itemName">
						{this.props.editable ?
							<input type="text" defaultValue={this.props.product} ref="edit"/>
		        :
							<label onClick={this.updateHightlight.bind(this)}>
								{this.props.product}
							</label>
		        }
					</span>
					<span className="action" onClick={(this.props.editable) ? this.updateItem.bind(this) : this.handleEditable.bind(this)}>
            {(this.props.editable) ? "Save" : "Edit"}
          </span>
					<span className="action" onClick={this.removeItem.bind(this)}>Delete</span>
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
		this.props.addItem(this.refs.product.value);
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

let root =  document.getElementById('root');

ReactDOM.render(
	<Provider store={store}>
		<VisibleShoppingList />
	</Provider>,
	root
	)
