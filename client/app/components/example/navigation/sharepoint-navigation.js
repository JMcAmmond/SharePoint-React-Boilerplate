import React from 'react';
import './styles/sharepoint-navigation.scss';

export default class SharePointNavigation extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			listVisible: false,
		};
		this._handleNavToggle = this._handleNavToggle.bind(this);
	}

	/**
	 * Get the sharepoint navigation dom element is append it to the '#react-nav' element
	 */
	componentDidMount() {
		let spnav = document.getElementsByClassName('ms-core-listMenu-verticalBox')[0];
		let child = spnav.getElementsByClassName('ms-core-listMenu-root')[0];
		let reactnav = document.getElementById('react-nav');

		reactnav.appendChild(child);
	}

	/**
	 * Toggle the listVisible state whenever called
	 * @private
	 */
	_handleNavToggle() {
		let visible = this.state.listVisible;
		this.setState({
			listVisible: !visible
		});
	}

	render() {
		/**
		 * css for the sharepoint list element
		 * @type {{display: string}}
		 */
		let spListStyle = {
			display: this.state.listVisible ? 'block' : 'none',
		};

		return (
			<div className="SharePointNavigation">
				<span className="nav-toggle" onClick={this._handleNavToggle}>
					SharePoint Links
					<i className={`fa fa-chevron-down ${this.state.listVisible ? 'active' : ''}`} style={{float: 'right'}}></i>
				</span>
				<div id="react-nav" style={spListStyle}>

				</div>
			</div>
		)
	}
}