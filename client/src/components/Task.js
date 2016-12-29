import React, {Component} from 'react';
import {DragSource, DropTarget} from 'react-dnd';

const taskSource = {
  beginDrag({ id, name, description, removeCard, moveCard, status, index }) {
    return {
      id,
      name,
      description,
      removeCard,
      moveCard,
      status,
      index
    };
  },
  endDrag(props, monitor) {
    const item = monitor.getItem();
    const didDrop = monitor.didDrop();
    if (!didDrop) {
      props.moveCard(item, item.id);
    }
  }
};
const taskTarget = {
  canDrop() {
    return false;
  },

  hover(props, monitor) {
    const dragged = monitor.getItem();
    const { id: overId } = props;
    if (dragged.id !== overId) {
      props.moveCard(dragged, overId);
    }
  }
};

const taskItem = 'task';
function collect(connect, monitor) {
  return {
    connectDragSource: connect.dragSource(),
    isDragging:        monitor.isDragging()
  }
}
class Task extends Component {
  render() {
    const { connectDropTarget, connectDragSource, isDragging } = this.props;
    const { name, description, up, down, next, prev, close } = this.props;
    return connectDropTarget(connectDragSource(<li className='list-group-item' style={{
      opacity: isDragging ? 0.5 : 1,
    }}>
      <button className="close" onClick={close}>
        <span>&times;</span>
      </button>
      <h4 className="list-group-item-heading">
        {name}
        <span className="caret"/>
      </h4>
      <p className="list-group-item-text collapse">{description}</p>
      <div className="btn-toolbar hidden-sm">
        <div className="btn-group btn-group-justified">
          <div className="btn-group">
            <button className="btn btn-default btn-sm" onClick={prev}>
              <span className="glyphicon glyphicon-menu-left"/>
            </button>
          </div>
          <div className="btn-group">
            <button className="btn btn-default btn-sm" onClick={next}>
              <span className="glyphicon glyphicon-menu-right"/>
            </button>
          </div>
          <div className="btn-group">
            <button className="btn btn-default btn-sm" onClick={up}>
              <span className="glyphicon glyphicon-menu-up"/>
            </button>
          </div>
          <div className="btn-group">
            <button className="btn btn-default btn-sm" onClick={down}>
              <span className="glyphicon glyphicon-menu-down"/>
            </button>
          </div>
        </div>
      </div>
    </li>))
  }
}
export default DropTarget(taskItem, taskTarget,
  connect => ({ connectDropTarget: connect.dropTarget() }))(DragSource(taskItem, taskSource, collect)(Task));
