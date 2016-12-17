class ShoppingList extends React.Component {
 render(){
   return (
    <div className="container">
       <div className="col-sm-6">
           <ul>
             <li className="row captions">
               <TodoForm onTaskSubmit={this.handleSubmit} />
             </li>
             <li className="row">
               <span className="itemName">iPhone 7</span>
               <span className="action">Edit</span>
               <span className="action">Delete</span>
             </li>
             <li className="row">
               <span className="itemName">Macbook Pro</span>
               <span className="action">Edit</span>
               <span className="action">Delete</span>
             </li>
             <li className="row">
               <span className="itemName">iPad</span>
               <span className="action">Edit</span>
               <span className="action">Delete</span>
             </li>
             <li className="row totals">
               <span className="action total">TOTAL</span>
               <span className="order highlight"> <a className="text-center">HIGHLIGHT</a></span>
             </li>
           </ul>
         </div>
      </div>
   );
 }
}

var TodoForm = React.createClass({
	doSubmit: function (e) {
		e.preventDefault();
		var task = React.findDOMNode(this.refs.task).value.trim();
		if (!task) {
			return;
		}
		this.props.onTaskSubmit(task);
		React.findDOMNode(this.refs.task).value = '';
		return;
	},
	render: function() {
		return (
			<form className="todoForm form-horizontal" onSubmit={this.doSubmit}>
        <span><input type="text" id="task" ref="task" className="form-control" placeholder="Add product" /></span>
        <span><input type="submit" value="Add" className="btn btn-primary" /></span>
			</form>
		);
	}
});

let root =  document.getElementById('root');

ReactDOM.render(
 <ShoppingList />, root
)
