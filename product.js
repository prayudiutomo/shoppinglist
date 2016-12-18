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

  handleItemUpdated(nodeId) {
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
		newItem.push({id: this.generateId().toString(), product: product});
		this.setState({newItem})
	}

	render() {
		return (
			<div className="container">
        <div className="col-sm-6">
  				<ProductList data={this.state.data} removeItem={this.handleItemRemoval.bind(this)} updateItem={this.handleItemUpdated.bind(this)} addItem={this.handleItemAdd.bind(this)}/>
        </div>
			</div>
		);
	}
}

class ProductList extends React.Component {
  constructor(props) {
    super(props);
  }

	render() {
		var listNodes = this.props.data.map(function (listItem) {
			return (
				<ProductAction
        key={listItem.id}
        nodeId={listItem.id}
        product={listItem.product}
        removeItem={this.props.removeItem.bind(this)}
				updateItem={this.props.updateItem.bind(this)}/>
			);
		},this);
		return (
			<ul className="list-group">
        <li className="row captions">
          <ProductForm addItem={this.props.addItem.bind(this)} />
        </li>
				{listNodes}
        <li className="row totals">
          <span className="action total">TOTAL: {this.props.data.length}</span>
          <span className="order highlight">HIGHLIGHT</span>
        </li>
			</ul>
		);
	}
}

class ProductAction extends React.Component {
  constructor(props) {
    super(props);
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
			<li className="row" onDoubleClick={this.updateItem.bind(this)}>
			<span className="itemName">{this.props.product}</span>
			<span className="action" onClick={this.updateItem.bind(this)}>Edit</span>
			<span className="action" onClick={this.removeItem.bind(this)}>Delete</span>
			</li>
			);
	}
}

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
        <span><input type="submit" value="Add" className="btn btn-primary" /></span>
			</form>
		);
	}
}

let root =  document.getElementById('root');

ReactDOM.render(
 <ShoppingList />, root
)
