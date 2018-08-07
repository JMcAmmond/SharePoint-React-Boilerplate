import React from 'react';
import { render } from 'react-dom';
import Loadable from 'react-loadable';
import { HashRouter, Route, Link } from "react-router-dom";


import './app.scss';

function Loading() {
	return <div>Loading</div>
}

const Home = Loadable({
	loader: () => import('./components/common/home'),
	loading: Loading
});

const Example = Loadable({
	loader: () => import('./components/common/example'),
	loading: Loading
});

const About = Loadable({
	loader: () => import('./components/common/about'),
	loading: Loading
});

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
							<li><Link to="/"><i className="fa fa-camera"/> Home</Link></li>
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
