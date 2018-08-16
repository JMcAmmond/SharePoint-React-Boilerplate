import React from 'react';

export default class About extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className="About">
                <p>The About component</p>

                {this.props.match.params.id !== undefined && (
                    <div>
                        id: {this.props.match.params.id}
                    </div>
                )}
            </div>
        )
    }
}
