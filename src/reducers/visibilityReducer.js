import Immutable from 'immutable'
import * as BASE_ACTION from '../constants/types/baseTypes'
import {
    stateStructure
} from './_stateStructure.js'

// const initialState = Immutable.fromJS(stateStructure.visible);

// console.log(initialState);

export default function visibilityFilter(state = 'SHOW_ALL', action) {
    console.log(state);
    switch (action.type) {
        case BASE_ACTION.SET_VISIBILITY_FILTER:
            {
                return action.filter;
            }
        default:
            return state;
    }
}