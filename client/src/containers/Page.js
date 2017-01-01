import {DragDropContext} from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';
import React, {Component} from 'react';
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import * as pageActions from '../actions/pageActions'
import Column from '../components/Column'
import AddTaskForm from '../components/AddTaskForm'

class Page extends Component {
  add(e) {
    e.preventDefault();
    const [name, description] = e.target.elements;
    const author = this.props.auth.getProfile();
    this.props.pageActions.add({
      name:        name.value,
      description: description.value,
      author:      author.name,
      status:      'todo',
      order:       this.props.tasks.filter(task => task.status === 'todo').length,
      project:     this.props.params.id
    });
  }

  componentDidMount() {
    this.props.pageActions.getTasks(this.props.auth, this.props.params.id)
  }

  render() {
    const { pageActions, tasks } = this.props;
    const project = this.props.params.id;
    const todo = tasks.filter(task => task.status === 'todo');
    const inprogress = tasks.filter(task => task.status === 'inprogress');
    const done = tasks.filter(task => task.status === 'done');
    return <div className="container">
      <div className="page-header">
        <h1 className="text-center">{project}</h1>
      </div>
      <div className="row">
        <AddTaskForm onSubmit={this.add.bind(this)}/>
      </div>
      <div className="row">
        <Column tasks={todo} status="todo" {...pageActions} project={project}/>
        <Column tasks={inprogress} status="inprogress" {...pageActions} project={project}/>
        <Column tasks={done} status="done" {...pageActions} project={project}/>
      </div>
    </div>
  }
}
function mapStateToProps(state) {
  return {
    tasks: state.tasks
  }
}

function mapDispatchToProps(dispatch) {
  return {
    pageActions: bindActionCreators(pageActions, dispatch)
  }
}

export default DragDropContext(HTML5Backend)(connect(mapStateToProps, mapDispatchToProps)(Page));
