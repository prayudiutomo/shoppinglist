class ShoppingList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [
				{"id":"01","product":"iPhone 7"},
				{"id":"02","product":"Macbook Pro"},
        {"id":"03","product":"iPad"}
			]
    };
  }

	generateId() {
		return Math.floor(Math.random()*90000) + 10000;
	}

	handleNodeRemoval(nodeId) {
		var data = this.state.data;
		data = data.filter(function (el) {
			return el.id !== nodeId;
		});
		this.setState({data});
		return;
	}

	handleSubmit(product) {
		var data = this.state.data;
		var id = this.generateId().toString();
		data = data.concat([{id, product}]);
		this.setState({data});
	}

	render() {
		return (
			<div className="container">
        <div className="col-sm-6">
  				<ProductList data={this.state.data} removeItem={this.handleNodeRemoval.bind(this)} updateItem={this.handleToggleComplete} />
        </div>
			</div>
		);
	}
}

class ProductList extends React.Component {
  constructor(props) {
    super(props);
    this.removeItem = this.removeItem.bind(this);
  }

	removeItem(nodeId) {
		this.props.removeItem(nodeId);
		return;
	}

	updateItem(nodeId) {
		this.props.updateItem(nodeId);
		return;
	}

	render() {
		var listNodes = this.props.data.map(function (listItem) {
			return (
				<ProductAction key={listItem.id} nodeId={listItem.id} product={listItem.product} removeItem={this.removeItem} updateItem={this.updateItem}/>
			);
		},this);
		return (
			<ul className="list-group">
        <li className="row captions">
          <ProductForm onTaskSubmit={this.handleSubmit} />
        </li>
				{listNodes}
        <li className="row totals">
          <span className="action total">TOTAL</span>
          <span className="order highlight">HIGHLIGHT</span>
        </li>
			</ul>
		);
	}
}

class ProductAction extends React.Component {
  constructor(props) {
    super(props);
    this.removeItem = this.removeItem.bind(this);
  }

	removeItem(e) {
		e.preventDefault();
		this.props.removeItem(this.props.nodeId);
		return;
	}

	updateItem(e) {
		e.preventDefault();
		this.props.updateItem(this.props.nodeId);
		return;
	}

	render() {
		return (
      <li className="row">
        <span className="itemName">{this.props.product}</span>
        <span className="action" onClick={this.updateItem}>Edit</span>
        <span className="action" onClick={this.removeItem}>Delete</span>
      </li>
		);
	}
}

class ProductForm extends React.Component {
	doSubmit(e) {
		e.preventDefault();
		this.props.onTaskSubmit(product);
		React.findDOMNode(this.refs.product).value = '';
		return;
	}

	render() {
		return (
			<form onSubmit={this.doSubmit}>
        <span><input type="text" id="product" ref="product" className="form-control" placeholder="Add product" /></span>
        <span><input type="submit" value="Add" className="btn btn-primary" /></span>
			</form>
		);
	}
}

let root =  document.getElementById('root');

ReactDOM.render(
 <ShoppingList />, root
)
