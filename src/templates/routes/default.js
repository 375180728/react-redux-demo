import React, { Component, PropTypes } from 'react';
import { HashRouter as Router, Route, Switch } from 'react-router-dom';
import Todo from '../../components/Todo.js';


export default class Routes extends Component {
    render() {
        return (
            <Router>
                <div>
                    <Route path="/" component={Todo}/>
                </div>
            </Router>
        )
    }
}
        