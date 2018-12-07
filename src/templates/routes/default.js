import React, { Component, PropTypes } from 'react';
import { HashRouter as Router, Route, Switch } from 'react-router-dom';
import App from '../../components/App'


export default class Routes extends Component {
    render() {
        return (
            <Router>
                <div>
                    <Route path="/" component={App}/>
                </div>
            </Router>
        )
    }
}
        