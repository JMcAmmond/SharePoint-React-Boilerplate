import React from 'react';
import './styles/styled-row.scss';

export default class StyledRow extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className={`StyledRow ${this.props.rowType}`}>
                {this.props.children}
            </div>
        )
    }
}

StyledRow.defaultProps = {
    rowType: ''
}
