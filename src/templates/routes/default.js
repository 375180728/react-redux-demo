import React, { Component, PropTypes } from 'react'
import { HashRouter as Router, Route, Switch } from 'react-router-dom'
import Test from '../../containers/default/Test.js'


export default class Routes extends Component {
    render() {
        return (
            <Router>
                <div>
                    <Route exact path="/" Component={Test}/>
                </div>
            </Router>
        )
    }
}
        