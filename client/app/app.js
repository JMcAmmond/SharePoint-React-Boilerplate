import React from 'react';
import { render } from 'react-dom';
import { HashRouter, Route, Link } from "react-router-dom";
import { Home, Example, About } from './components';

import './app.scss';

export default class Application extends React.Component {
	constructor(props) {
        super(props);
	}

    render() {
        return (
            <HashRouter>
                <div className="Application">
                    <nav className="site-navigation">
                        <ul>
                            <li><Link to="/">Home</Link></li>
                            <li><Link to="/example">Example</Link></li>
                            <li><Link to="/about">About</Link></li>
                        </ul>
                    </nav>

                    <Route exact path="/" component={Home} />
                    <Route path="/example" component={Example} />
                    <Route path="/about" component={About} />
                </div>
            </HashRouter>
        )
    }
}
