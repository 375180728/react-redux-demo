import Immutable from 'immutable'
import * as BASE_ACTION from '../constants/types/baseTypes'
import {
    stateStructure
} from './_stateStructure.js'

// const initialState = Immutable.fromJS(stateStructure.todos);

// console.log(initialState);

export default function todos(state = [], action) {
    console.log(state);
    console.log(action);
    switch (action.type) {
        case BASE_ACTION.ADD_TODO:
            {
                return [
                    ...state, 
                    {
                        id: action.id,
                        text: action.text,
                        completed: false
                    }
                ]

            }
        case BASE_ACTION.TOGGLE_TODO:
            {
                return state.map((todo, index) => {
                    if (index === action.index) {
                        return Object.assign({}, todo, {
                            completed: !todo.completed
                        })
                    }
                    return todo
                })
            }
        default:
            return state;
    }
}