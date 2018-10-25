import React from 'react';
import './styles/modal.scss';

export default class Modal extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className={`Modal ${this.props.className}`}>
                <div className="Modal--background"></div>
                <div className="Modal--content">
                    <span className="Modal--close" onClick={this.props.closeModal}>{this.props.closeLabel}</span>
                    {this.props.children}
                </div>
            </div>
        )
    }
}

Modal.defaultProps = {
    closeLabel: '×',
    className: ''
}