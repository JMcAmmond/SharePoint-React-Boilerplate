import React from 'react';

export default class StyledRow extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className={`row ${this.props.rowType}`}>
                {this.props.children}
            </div>
        )
    }
}

StyledRow.defaultProps = {
    rowType: 'even-spaced'
}
