import React from 'react';
import { NavLink } from "react-router-dom";
import SharePointNavigation from './sharepoint-navigation';
import './styles/navigation.scss';

export default class Navigation extends React.Component {
	constructor(props) {
		super(props);
	}

	render() {
		return (
			<nav className="Navigation">
			    <ul className="nav-items">
			        <li className="nav-item"><NavLink exact={true} activeClassName='is-active' to="/">Home</NavLink></li>
			        <li className="nav-item"><NavLink activeClassName='is-active' to="/attachments">Attachments</NavLink></li>
			        <li className="nav-item"><NavLink activeClassName='is-active' to="/comments">Comments</NavLink></li>
			        <li className="nav-item"><NavLink activeClassName='is-active' to="/error-boundary">Error Boundary</NavLink></li>
			        <li className="nav-item"><NavLink activeClassName='is-active' to="/form-label">Form Label</NavLink></li>
			        <li className="nav-item"><NavLink activeClassName='is-active' to="/modal">Modal</NavLink></li>
			        <li className="nav-item"><NavLink activeClassName='is-active' to="/people-picker">People Picker</NavLink></li>
			        <li className="nav-item"><NavLink activeClassName='is-active' to="/signature-canvas">Signature Canvas</NavLink></li>
			        <li className="nav-item"><NavLink activeClassName='is-active' to="/styled-container-row">Styled Container & Row</NavLink></li>
			    </ul>

			    <SharePointNavigation/>
			</nav>
		)
	}
}