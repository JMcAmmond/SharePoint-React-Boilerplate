import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { ActionCreators } from '../../actions/index';
import StyledContainer from '../common/styled-container';
import StyledRow from '../common/styled-row';

class ReduxCounter extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            incrementSteps: 1
        }
        this.handleIncrementStepsChange = this.handleIncrementStepsChange.bind(this);
        this.onIncrementClick = this.onIncrementClick.bind(this);
        this.onDecrementClick = this.onDecrementClick.bind(this);
    }

    //When the input value is changed update that component state.
    handleIncrementStepsChange(e) {
        this.setState({
            incrementSteps: e.target.value
        });
    }

    //When the increment button is clicked call the 'IncrementCounter' action in redux
    onIncrementClick() {
        this.props.IncrementCounter(this.state.incrementSteps);
    }

    //When the decrement button is clicked call the 'DecrementCounter' action in redux
    onDecrementClick() {
        this.props.DecrementCounter(this.state.incrementSteps);
    }

    render() {
        return (
            <StyledContainer className="ReduxCounter" title="Redux Counter">
                <StyledRow>
                    <div>
                        <span>Counter: {this.props.counter}</span>
                    </div>
                </StyledRow>

                <StyledRow>
                    <div>
                        <label className="required">Increment/decrament by</label>
                        <input value={this.state.incrementSteps} onChange={this.handleIncrementStepsChange} type="number" min="1"/>
                    </div>

                    <div>
                        <button type="button" onClick={this.onIncrementClick}>Increment</button>
                        <button type="button" onClick={this.onDecrementClick}>Decrement</button>
                    </div>
                </StyledRow>
            </StyledContainer>
        )
    }
}

/**
 * Map dispatch to props
 * @param dispatch
 * @returns {*}
 */
function mapDispatchToProps(dispatch) {
    return bindActionCreators(ActionCreators, dispatch);
}

/**
 * List of available props from the application state
 */
export default connect((state) => { return {
    counter: state.counter
}}, mapDispatchToProps)(ReduxCounter);