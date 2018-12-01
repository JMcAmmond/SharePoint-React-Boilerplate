import React from 'react';
import StyledContainer from '../../common/styled-container';
import StyledRow from '../../common/styled-row';
import ErrorBoundary from '../../common/error-boundary';

class BuggyCounter extends React.Component {
    constructor(props) {
        super(props);
        this.state = { counter: 0 };
        this.handleClick = this.handleClick.bind(this);
    }
  
    handleClick() {
        this.setState(({counter}) => ({
            counter: counter + 1
        }));
    }
  
    render() {
        if (this.state.counter === 5) {
            // Simulate a JS error
            throw new Error('I crashed!');
        }
        return (
            <div>
                <p>Click Count: {this.state.counter}</p>
                <button type="button" onClick={this.handleClick}>Click Me!</button>
            </div>
        );
    }
}

export default class ErrorBoundaryView extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div>
                <StyledContainer
                    title="Error Boundary"
                    className="ErrorBoundaryView"
                    description={(
                        <p>
                            This is an example of error boundaries in React 16.<br />
                            Click on the button to increase the counter.<br />
                            The counter is programmed to throw an error when it reaches 5. This simulates a JavaScript error in a component.
                        </p>
                    )}
                >
                    <ErrorBoundary>
                        <BuggyCounter/>
                    </ErrorBoundary>

                </StyledContainer>

                <StyledContainer
                    title="Usage"
                    className="ErrorBoundaryCode"
                >
                    <pre>{code}</pre>
                </StyledContainer>
            </div>
        )
    }
}



const code = 
`import React from 'react';
import ErrorBoundary from '../common/error-boundary';

export default class ErrorBoundaryView extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div>
                <ErrorBoundary>
                    <SomeOtherComponent/>
                </ErrorBoundary>
            </div>
        )
    }
}`;