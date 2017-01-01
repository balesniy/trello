import Task from './Task'
import React, {Component} from 'react';
import update from 'react/lib/update';
import {DropTarget} from 'react-dnd';
const taskItem = 'task';
const columnTarget = {
  drop(props, monitor, component) {
    props.update(props.status, component.state.tasks, {
      status: monitor.getItem().status,
      _id:    monitor.getItem()._id
    }, props.project);
  },
  hover(_, monitor, component){
    if (monitor.isOver({ shallow: true })) {
      const item = monitor.getItem();
      component.moveCard(item)
    }
  }
};
function collect(connect, monitor) {
  return {
    connectDropTarget: connect.dropTarget(),
    isOver:            monitor.isOver()
  };
}
class Column extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tasks: []
    }
  }

  componentWillReceiveProps({ tasks }) {
    this.setState({
      tasks
    })
  }

  moveCard(dragged, overId) {
    const draggedIndex = this.state.tasks.findIndex(({ _id }) => _id === dragged._id);
    if (!~draggedIndex) {
      dragged.removeCard(dragged._id);
    }
    const overIndex = this.state.tasks.findIndex(({ _id }) => _id === overId);
    this.setState(update(this.state, {
      tasks: {
        $splice: [
          [draggedIndex, ~draggedIndex ? 1 : 0],
          [overIndex, 0, { ...dragged, ...{ status: this.props.status } }]
        ]
      }
    }));
  }

  removeCard(draggedId) {
    const index = this.state.tasks.findIndex(({ _id }) => _id === draggedId);
    if (!~index) {
      return;
    }
    this.setState(update(this.state, {
      tasks: {
        $splice: [
          [index, 1]
        ]
      }
    }));
  }

  render() {
    const { connectDropTarget } = this.props;
    const { status, project } = this.props;
    const { up, down, prev, next, close } = this.props;
    const taskList = this.state.tasks.map(({ name, description, _id, order }) =>
      <Task key={_id}
            _id={_id}
            name={name}
            order={order}
            status={status}
            description={description}
            moveCard={this.moveCard.bind(this)}
            removeCard={this.removeCard.bind(this)}
            close={() => close({
              _id,
              project
            })}
            up={() => up({
              _id,
              project
            })}
            down={() => down({
              _id,
              project
            })}
            next={() => next({
              _id,
              project
            })}
            prev={() => prev({
              _id,
              project
            })}
      />);
    return <div className="col-sm-4">
      <div className="panel panel-default">
        <div className="panel-heading">
          {status}
          <span className="badge pull-right">{this.state.tasks.length}</span>
        </div>
        <div className="panel-body">
          {
            connectDropTarget(
              <ul className="list-group" style={{ minHeight: '50px' }}>
                {taskList}
              </ul>)
          }
        </div>
      </div>
    </div>
  }
}
export default DropTarget(taskItem, columnTarget, collect)(Column);