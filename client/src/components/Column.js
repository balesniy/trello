import Task from './Task'
import React, {Component} from 'react';
import update from 'react/lib/update';
import {DropTarget} from 'react-dnd';
const taskItem = 'task';
const columnTarget = {
  drop(props, monitor, component) {
    props.update(props.status, component.state.tasks, {
      status: monitor.getItem().status,
      id:     monitor.getItem().id
    });
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
    const draggedIndex = this.state.tasks.findIndex(({ id }) => id === dragged.id);
    if (!~draggedIndex) {
      dragged.removeCard(dragged.id);
    }
    const overIndex = this.state.tasks.findIndex(({ id }) => id === overId);
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
    const index = this.state.tasks.findIndex(({ id }) => id === draggedId);
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
    const { connectDropTarget, isOver } = this.props;
    const { status } = this.props;
    const { up, down, prev, next, close } = this.props;
    const taskList = this.state.tasks.map(({ name, description, id, order }, index) =>
      <Task key={id}
            id={id}
            name={name}
            order={order}
            index={index}
            status={status}
            description={description}
            moveCard={this.moveCard.bind(this)}
            removeCard={this.removeCard.bind(this)}
            close={() => close(id)}
            up={() => up(id)}
            down={() => down(id)}
            next={() => next(id)}
            prev={() => prev(id)}
      />);
    return <div className="col-sm-4">
      <div className="panel panel-default">
        <div className="panel-heading">
          {status}{isOver ? 'nen' : 'nfv'}
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