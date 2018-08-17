/*********************************************************
 *                        IMPORTANT!
 *					
 *        This is a Reactjs application using Redux
 *        and intended for use on SharePoint sites
 *  
 ********************************************************/

import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware, combineReducers, compose } from 'redux';
import thunkMiddleware from 'redux-thunk';
import createLogger from 'redux-logger';
import reducer from './app/reducers/index';
import Loadable from 'react-loadable';
import { Application } from './app/components';

const middleware = [thunkMiddleware];

/**
 * Only apply logger middleware if not in production
 */
if(process.env.NODE_ENV !== 'production') {
    const loggerMiddleware = createLogger();
    middleware.push(loggerMiddleware);
}

/**
 * Configure redux store
 * @param initialState
 * @returns {*}
 */
function configureStore(initialState) {
    const enhancer = compose( applyMiddleware( ...middleware ) );

    return createStore(reducer, initialState, enhancer);
}
const store = configureStore({});

/**
 * App is your application. This is the beginning of the React app.
 * Sets up the Redux store and calls the Application component
 */
class App extends React.Component {
    render() {
        return (
            <Provider store={store}>
                <Application/>
            </Provider>
        )
    }
}

/**
 * Wait for SharePoint functions to load before rendering the application
 */
SP.SOD.executeFunc( 'sp.js', 'SP.ClientContext', function() {
    render(<App/>, document.getElementById('app'));
});
