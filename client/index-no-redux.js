/*********************************************************
 *                        IMPORTANT!
 *					
 *            This is a Reactjs application
 *        and intended for use on SharePoint sites
 *  
 ********************************************************/

import React from 'react';
import { render } from 'react-dom';
import { Application } from './app/components';

/**
 * App is your application. This is the beginning of the React app.
 */
class App extends React.Component {
    render() {
        return (
            <Application/>
        )
    }
}

/**
 * Wait for SharePoint functions to load before rendering the application
 */
SP.SOD.executeFunc( 'sp.js', 'SP.ClientContext', function() {
    render(<App/>, document.getElementById('app'));
});
