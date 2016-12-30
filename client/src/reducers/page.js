import {handleActions} from 'redux-actions';
import {getTasks, add} from '../actions/pageActions'
export default handleActions({
    [getTasks]: (state, action) => action.payload.tasks.sort((a, b) => a.order - b.order),
    [add]:      (state, action) => [...state, action.payload],
    CLOSE:      (state, action) => state.filter(({ id }) => id !== action.payload.id),
    UP:         (state, action) => {
      const { id } = action.payload;
      const item = state.find(task => task.id === id);
      const { order, status } = item;
      if (!order) {
        return state;
      }
      const prev = state.find(task => task.status === status && task.order === order - 1);
      const updatedPrev = { ...prev, ...{ order: order } };
      const updatedItem = { ...item, ...{ order: order - 1 } };
      return [...state.filter(task => task !== item && task !== prev), updatedItem, updatedPrev]
    },
    DOWN:       (state, action) => {
      const { id } = action.payload;
      const item = state.find(task => task.id === id);
      const { order, status } = item;
      const prev = state.find(task => task.status === status && task.order === order + 1);
      if (!prev) {
        return state;
      }
      const updatedPrev = { ...prev, ...{ order: order } };
      const updatedItem = { ...item, ...{ order: order + 1 } };
      return [...state.filter(task => task !== item && task !== prev), updatedItem, updatedPrev]
    },
    NEXT:       (state, action) => {
      const { id } = action.payload;
      const item = state.find(task => task.id === id);
      const nextStatus = item.status === 'todo' ? 'inprogress' : 'done';
      if (nextStatus === item.status) {
        return state;
      }
      const nextOrder = state.filter(task => task.status === nextStatus).length;
      const updatedItem = {
        ...item, ...{
          order:  nextOrder,
          status: nextStatus
        }
      };
      return [...state.filter(task => task !== item), updatedItem]
    },
    PREV:       (state, action) => {
      const { id } = action.payload;
      const item = state.find(task => task.id === id);
      const nextStatus = item.status === 'done' ? 'inprogress' : 'todo';
      if (nextStatus === item.status) {
        return state;
      }
      const nextOrder = state.filter(task => task.status === nextStatus).length;
      const updatedItem = {
        ...item, ...{
          order:  nextOrder,
          status: nextStatus
        }
      };
      return [...state.filter(task => task !== item), updatedItem]
    },
    UPDATE:     (state, action) => {
      const { status, tasks, from } = action.payload;
      if (status === from.status) {
        return [...state.filter(task => task.status !== status), ...tasks]
      }
      else {
        return [...state.filter(task => task.id !== from.id && task.status !== status), ...tasks]
      }
    }
  }
  , []);