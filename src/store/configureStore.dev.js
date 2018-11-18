import {
    createStore,
    applyMiddleware,
    compose
} from 'redux'
import thunk from 'redux-thunk'
import createLogger from 'redux-logger'
import http from '../middleware/http'
import relations from '../middleware/relations'
import async from '../middleware/async'
import rootReducer from '../reducers'

export default function configureStore(initialState) {

    var _m;

    if (window.devToolsExtension) {
        _m = compose(
            applyMiddleware(thunk, http),
            window.devToolsExtension()
        )
    } else {
        _m = compose(
            applyMiddleware(thunk, http)
        )
    }

    const store = createStore(
        rootReducer,
        initialState,
        _m
    )


    if (module.hot) {
        module.hot.accept('../reducers', () => {
            const nextRootReducer = require('../reducers').default
            store.replaceReducer(nextRootReducer)
        })
    }

    return store
}