import React from 'react';
import StyledContainer from '../../common/styled-container';
import StyledRow from '../../common/styled-row';

export default class HomeView extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div>
                <StyledContainer
                    title="Home"
                    className="HomeView"
                >
                    This is the home page!
                </StyledContainer>
            </div>
        )
    }
}
