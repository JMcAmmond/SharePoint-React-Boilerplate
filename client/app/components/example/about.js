import React from 'react';
import StyledContainer from '../common/styled-container';
import StyledRow from '../common/styled-row';
import Iframe from '../common/iframe';

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

                <StyledContainer className="iframe-container" title="Documents">
                    <StyledRow>
                        <Iframe/>
                    </StyledRow>
                </StyledContainer>
            </div>
        )
    }
}
