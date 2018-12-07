import Root from '../roots/default.js';
import { render } from 'react-dom';
import configureStore from '../../store/configureStore.js';
import { initContext } from '../../helpers/common.js';
        
initContext();

const store = configureStore();



render(
    <Root store={store}/>,
    document.getElementById('root')
)

