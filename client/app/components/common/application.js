import React from 'react';
import { HashRouter, Route, Link } from "react-router-dom";
import { Home, Example, About } from '../../components';

import './styles/application.scss';

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
                            <li><Link to="/about/4">About with id</Link></li>
                        </ul>
                    </nav>

                    <Route exact path="/" component={Home} />
                    <Route path="/example" component={Example} />
                    <Route exact path="/about" component={About} />
                    <Route path="/about/:id" component={About} />
                </div>
            </HashRouter>
        )
    }
}