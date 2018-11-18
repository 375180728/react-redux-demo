import { combineReducers } from 'redux'
import todos from './todosReducer'
import visibilityFilter from './visibilityReducer'

const todoApp = combineReducers({
  todos,
  visibilityFilter
})


export default todoApp;