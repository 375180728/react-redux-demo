import Root from '../roots/default.js';
import { render } from 'react-dom';
import configureStore from '../../store/configureStore.js';
import { initContext } from '../../helpers/common.js';

import {
  addTodo,
  toggleTodo,
  setVisibilityFilter
} from '../../actions/baseAction';



initContext();
const store = configureStore();

// store.dispatch(addTodo('Learn about actions'))
// store.dispatch(addTodo('Learn about reducers'))

// store.subscribe(() => {
//     console.log(store.getState());
// });


// store.dispatch(addTodo('Learn about store'))
// store.dispatch(toggleTodo(0))
// store.dispatch(toggleTodo(1))
// store.dispatch(setVisibilityFilter(VisibilityFilters.SHOW_COMPLETED))        



render(
    <Root store={store}/>,
    document.getElementById('root')
)

