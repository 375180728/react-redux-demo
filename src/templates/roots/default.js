import React, { Component, PropTypes } from 'react';
import { Provider } from 'react-redux';
import Routes from '../routes/default.js';

export default class Root extends Component {
    render() {
        const { store } = this.props;
        return(
            <Provider store={store}>
                <Routes/>
            </Provider>
        )
    }
}