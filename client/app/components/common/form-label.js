import React from 'react';

import './styles/form-label.scss';

export default class FormLabel extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        var match = typeof this.props.value !== 'string' || 
                    this.props.value === "" || 
                    this.props.value.match(this.props.pattern) !== null;

        var required = this.props.required && 
                      (this.props.value === null || this.props.value === "" || 
                      (Array.isArray(this.props.value) && this.props.value.length === 0));
        
        return(
            <React.Fragment>
                <div className="error-container">
                    <label className="form-label">{this.props.label}</label>
                    {(required && match) && (
                        <div className="error-message">{this.props.requiredLabel}</div>
                    )}
                    {(!required && !match) && (
                        <div className="error-message">{"*" + this.props.message}</div>
                    )}
                </div>
                <div className="form-label-children">{this.props.children}</div>
            </React.Fragment>
        )
    }
}

FormLabel.defaultProps = {
    label: "",
    message: "",
    pattern: /./,
    required: false,
    requiredLabel: "*",
    value: ""
}