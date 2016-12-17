class ShoppingList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [
				{"id":"00001","product":"iPhone 7","complete":"false"},
				{"id":"00002","product":"Macbook Pro","complete":"false"},
        {"id":"00003","product":"iPad","complete":"false"}
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
	handleSubmit(task) {
		var data = this.state.data;
		var id = this.generateId().toString();
		var complete = 'false';
		data = data.concat([{id, task, complete}]);
		this.setState({data});
	}
	handleToggleComplete(nodeId) {
		var data = this.state.data;
		for (var i in data) {
			if (data[i].id == nodeId) {
				data[i].complete = data[i].complete === 'true' ? 'false' : 'true';
				break;
			}
		}
		this.setState({data});
		return;
	}
	render() {
		return (
			<div className="container">
        <div className="col-sm-6">
  				<ProductList data={this.state.data} removeItem={this.handleNodeRemoval} updateItem={this.handleToggleComplete} />
        </div>
			</div>
		);
	}
}

class ProductList extends React.Component {
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
		var product = React.findDOMNode(this.refs.product).value.trim();
		if (!product) {
			return;
		}
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
