import React, { Component } from 'react';
import { connect } from 'react-redux';
import './App.css';
import { changeUserName } from './store/actions';
import { getData, editedTodo, callDelete, updateTodo } from './store/actions';
import AppBar from 'material-ui/AppBar';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import { ListItem } from 'material-ui/List'
import Paper from 'material-ui/Paper';


const style = {
  margin: "0 auto",
  textAlign: 'center',
  display: 'inline-block',
};




class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      empty: "",
      editname: '',
      flag: false,
      val: [],
      id: []
    }
  }


  handleChange(ev) {
    this.setState({
      [ev.target.name]: ev.target.value,
    })
  }


  onChangeHandler(eve) {
    this.setState({
      [eve.target.name]: eve.target.value
    })
  }


  submit(ev) {
    let name1 = this.state.name
    this.props.changeUserName(name1)
}


  editSubmit(ind) {
    let edited = this.state.editname
    this.props.updateTodo(edited, ind)
  }


  edit(val, ind) {
    this.props.editedTodo(val, ind)
  }


  delete(id, ind) {
    this.props.callDelete(id, ind)
  }


  componentWillMount() {
    this.props.getData()
  }


  render() {

    return (
      <div>

        <AppBar
          title="Todo Application"
          iconClassNameRight="muidocs-icon-navigation-expand-more" />

        <Paper style={style} zDepth={5}>

        <TextField ref="name" name="name" onChange={this.handleChange.bind(this)}
          hintText="Your Todo Here......"
          floatingLabelText="Note Down Your Daily Todo"
          floatingLabelFixed={true} />
        <RaisedButton label="Add Todo" primary={true} onClick={this.submit.bind(this)} />



        {this.props.todo.map((val, ind) => {
          return (<div key={ind}>
            <ListItem value={3} primaryText={val.todo} key={val.id} />
            {(!val.flag) ?
              <div>
                <TextField className="li" hintText='edit' ref='editname' name='editname' onChange={this.onChangeHandler.bind(this)} />
                <button onClick={this.editSubmit.bind(this, ind)}>update</button>
              </div>

              :

              <div>
                <button onClick={this.delete.bind(this, val.id, ind)}>Delete</button>
                <button onClick={this.edit.bind(this, val, ind)}>Edit</button>
              </div>
            }
          </div>
          )
        })
        }
        </Paper>
      </div>
    );
  }
}


function mapStateToProp(state) {
  return ({
    todo: state.root.todo,
    flag: state.root.flag

  })
}



function mapDispatchToProp(dispatch) {
  return ({
    changeUserName: (name) => { dispatch(changeUserName(name)) },
    getData: () => { dispatch(getData()) },
    callDelete: (id, ind) => { dispatch(callDelete(id, ind)) },
    editedTodo: (val, ind) => { dispatch(editedTodo(val, ind)) },
    updateTodo: (val, ind) => { dispatch(updateTodo(val, ind)) },
  })
}





export default connect(mapStateToProp, mapDispatchToProp)(App);
