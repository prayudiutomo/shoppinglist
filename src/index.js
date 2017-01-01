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
	data:[
    {
		  id: Math.floor(Math.random()*90000) + 10000,
  		product: 'Apple Macbook',
  		highlight: false,
  		editable: false
	  },
    {
      id: Math.floor(Math.random()*90000) + 10000,
  		product: 'Apple iPad',
  		highlight: false,
  		editable: false
    }
  ]
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
    this.state = {
      text: ''
    }
	}

	doSubmit(e) {
		e.preventDefault();
    console.log(this.state.text);
		this.props.addProduct(this.state.text);
		//this.state.text.value = '';
		return;
	}

	render() {
		return (
			<View>
				<TextInput
					id="product" ref="product"
	        style={styles.form}
          onChangeText={(text) => this.setState({text})}
          value={this.state.text}
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

const Footer = (props) => {
  console.log(props.data);

  var numHighlight = props.data.reduce(function(count, item) {
    return count + (item["highlight"] === true ? 1 : 0);
  }, 0);

  var highlightNodes = props.data.map(function (listItem) {
    if(listItem.highlight) {
      return (
        listItem.product
        )
    }
    return;
  });

	return (
		<View>
			<Text>Highlighted: {numHighlight}</Text>
			<Text>Total: {props.data.length}</Text>
			<Text>Highlighted Item: {highlightNodes.filter(function(n){ return n !== undefined }).join(', ')}</Text>
		</View>
	);
}
const VisibleFooter = connect(
	mapStateToProps,
	mapDispatchToProps
)(Footer)

class ProductList extends React.Component {
	constructor(props) {
    super(props);

    this.state = {
      product: false
    }
  }

  componentWillMount() {
    this.dataSource = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
  }

  renderRow(rowData) {
    return (
			<View className={styles.textList}>

      { rowData.editable ?
        <TextInput
          style={styles.edit}
          defaultValue={rowData.product}
          onChangeText={(product) => this.setState({product})}
        />
        :
        <Text onPress={() => { this.props.setHighlight(rowData.id); }}>
          {rowData.product}
        </Text>
      }
        <Text onPress={() => {this.props.deleteProduct(rowData.id)}}
        >Delete</Text>
      <Text onPress={() => {
        (rowData.editable) ? (this.state.product)? this.props.editProduct(rowData.id, this.state.product):this.props.editProduct(rowData.id, rowData.product) :
        this.props.setEditable(rowData.id);
        }}>
          {(rowData.editable) ? "Save" : "Edit"}
        </Text>
      </View>
    );
  }

	render() {
    var dataSource = this.dataSource.cloneWithRows(this.props.data)
		return <ListView
			dataSource={dataSource}
      renderRow={(rowData) => this.renderRow(rowData)}
		/>
	}
}
const VisibleProductList = connect(
	mapStateToProps,
	mapDispatchToProps
)(ProductList)

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
					<VisibleProductForm/>
					<VisibleProductList/>
					<VisibleFooter/>
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
	},
  edit: {
    height: 40,
    borderColor: '#000',
    borderWidth: 1
  }
});

export default ShoppingList;
