import {
  StyleSheet
} from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
	* {
		box-sizing: border-box,
	},
	body{
		fontSize : 16,
		backgroundColor: '#f2f6f9',
		fontFamily: Helvetica, Arial, sans-serif,
	},
	h2 {
		textTransform: capitalize,
	},
	ul{
		listStyleType: none,
	},
	li {
	    display: list-item,
	    textAlign: -webkit-match-parent,
	},
	a:hover {
		textDecoration:none,
	},
	.highlight .itemName {
		fontWeight: bold,
	},
	.highlightDetails {
			marginTop: 0,
			clear: both,
			display: block,
	},
	.container {
	    marginRight: auto,
	    marginLeft: auto,
	    paddingLeft: 15,
	    paddingRight: 15,
	},
	.col-sm-6 {
	    width: 50%,
	},
	.row {
	    paddingBottom: 0,
	    paddingLeft: 15,
	    backgroundColor: '#ffffff',
	    marginBottom: 11,
	},
	.row {
	    marginLeft: -15,
	    marginRight: -15,
	},
	.row:before, .row:after {
		clear: both,
		content: " ",
		display: table,
	},
	.row span{
		padding: 10 0 6 0,
	},
	.captions{
		color: '#7e93a7',
		fontSize:12,
		textTransform: uppercase,
		padding: 0,
		boxShadow: 0 0 0,
		backgroundColor: '#f2f6f9',
		marginTop: 20,
	},
	.captions span{
		padding: 0 21 0 0,
	},
	.itemName{
		color: '#727578',
		fontSize :16,
		float: left,
		paddingLeft:25,
		cursor: pointer,
	},
	.action{
		color: '#f06953',
		fontWeight: bold,
		float: right,
		marginRight: 10,
		cursor: pointer,
	},
	.totals{
		backgroundColor: '#f2f6f9',
	},
	.totals span{
		padding: 10 15 10 0,
	},
	.totals .action{
		float: left,
	},
	.totals .itemName{
		marginTop: 1,
	},
	.totals .order{
		float: right,
		padding: 0,
		marginTop: 10,
		paddingLeft: 5,
	},
	.order {
		color: '#f06953',
		fontWeight: bold,
	},
	.form-control {
		width: 67%,
		display: inline-block,
		fontSize: 14,
		paddingLeft: 15,
		paddingRight: 15,
	},
	.btn {
			font-size: 16,
	},
	label {
			padding: 8 10 5 10,
			border: 1 solid #fff,
	},
	label[contenteditable='true'] {
	    border: 1 solid #aaa,
			backgroundColor: '#efefef',
	}
});

module.exports = styles
