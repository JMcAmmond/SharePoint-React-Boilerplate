import React from 'react';
import './styles/styled-container.scss';

export default class StyledContainer extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <section className={`StyledContainer ${this.props.className}`}>
                
                {(this.props.title || this.props.description) && (
                    <div className="section-title">
                        <span className="title">{this.props.title}</span>
                        {this.props.description && (
                            this.props.description
                        )}
                    </div>
                )}

                <div className="section-body">
                    { this.props.children }
                </div>
                
            </section>
        )
    }
}

StyledContainer.defaultProps = {
    children: <p>Nothing to display</p>
}
