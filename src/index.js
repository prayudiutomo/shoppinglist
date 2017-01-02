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
	return (
    <View style={styles.header}>
      <Text style={styles.headerText}>Shopping List</Text>
    </View>
  )
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
		this.state.text = '';
		return;
	}

	render() {
		return (
			<View style={styles.formView}>
        <View>
          <TextInput
					id="product" ref="product"
	        style={styles.formInput}
          onChangeText={(text) => this.setState({text})}
          value={this.state.text}
	      />
        </View>
        <View>
				  <Button onPress={this.doSubmit.bind(this)}/>
        </View>
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
		<TouchableOpacity style={styles.button} onPress={onPress}>
      <Text>Add</Text>
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
		<View style={styles.footer}>
			<View style={styles.footerTop}>
        <View>
          <Text>Highlighted: {numHighlight}</Text>
        </View>
        <View>
          <Text>Total: {props.data.length}</Text>
        </View>
      </View>
			<View>
        <Text>Highlighted Item: {highlightNodes.filter(function(n){ return n !== undefined }).join(', ')}</Text>
      </View>
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
			<View style={styles.textList}>

      { rowData.editable ?
        <TextInput
          style={styles.editList}
          defaultValue={rowData.product}
          onChangeText={(product) => this.setState({product})}
        />
        :
        <View>
          <Text style={
            (rowData.editable) ?
              styles.highlighted
              :
              styles.highlighteds
            }
            onPress={() => { this.props.setHighlight(rowData.id); }}>{rowData.product}</Text>
        </View>
      }

      <View style={styles.actionList}>
        <View>
          <Text onPress={() => {this.props.deleteProduct(rowData.id)}}
            >Delete</Text>
        </View>
        <View>
            <Text onPress={() => {
              (rowData.editable) ? (this.state.product)? this.props.editProduct(rowData.id, this.state.product) : this.props.editProduct(rowData.id, rowData.product) :
              this.props.setEditable(rowData.id);
              }}>
              {(rowData.editable) ? "Save" : "Edit"}
            </Text>
          </View>
        </View>
      </View>
    );
  }

	render() {
    var dataSource = this.dataSource.cloneWithRows(this.props.data)
		return <ListView
      style={styles.listView}
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
		paddingTop: 40,
    flex: 1,
    justifyContent: 'space-around',
    flexDirection: 'column',
	},
  header: {
    alignItems: 'center',
    marginLeft: 10,
    marginRight: 10,
  },
  headerText: {
    fontSize: 24,
    color: 'black'
  },
  formView: {
    alignItems: 'center',
    marginTop: 20,
    marginLeft: 10,
    marginRight: 10,
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  formInput: {
		height: 40,
    width: 300,
		borderColor: 'gray',
		borderWidth: 1
	},
	button: {
		backgroundColor: '#efefef',
		borderWidth: 1,
		borderColor: '#aaa',
    padding: 10
	},
  listView: {
    borderColor: 'gray',
    borderWidth: 1,
    borderLeftWidth: 0,
    borderRightWidth: 0,
    marginTop: 20,
    marginLeft: 10,
    marginRight: 10,
    paddingTop: 5,
    paddingBottom: 10,
  },
  textList: {
    borderColor: '#aaa',
    borderWidth: 1,
    borderLeftWidth: 0,
    borderRightWidth: 0,
    borderTopWidth: 0,
    paddingTop: 10,
    paddingBottom: 10,
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  actionList: {
    width: 100,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'flex-end'
  },
  editList: {
    height: 30,
    width: 200,
    borderColor: '#ff0000',
    borderWidth: 1
  },
  highlighted: {
    backgroundColor: '#eaeaea'
  },
  footer: {
    marginTop: 10,
    marginBottom: 20,
    marginLeft: 10,
    marginRight: 10,
    flexDirection: 'column',
    justifyContent: 'space-around'
  },
  footerTop: {
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
});

export default ShoppingList;
