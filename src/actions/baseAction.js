import * as ACTION from '../constants/types/baseTypes';

let nextTodoId = 0

export const addTodo = text => {
    return {
        type: ACTION.ADD_TODO,
        id: nextTodoId++,
        text
    }
}

export const setVisibilityFilter = filter => {
    return {
        type: ACTION.SET_VISIBILITY_FILTER,
        filter
    }
}

export const toggleTodo = id => {
    return {
        type: ACTION.TOGGLE_TODO,
        id
    }
}