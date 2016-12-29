import {combineReducers} from 'redux'
import tasks from './page'
import user from './user'
import projects from './projects'

export default combineReducers({
  tasks,
  user,
  projects
})