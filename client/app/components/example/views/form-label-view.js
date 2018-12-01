import React from 'react';
import StyledContainer from '../../common/styled-container';
import StyledRow from '../../common/styled-row';
import FormLabel from '../../common/form-label';

export default class FormLabelView extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            text: "",
            number: ""
        };
        this.inputOneChange = this.inputOneChange.bind(this);
        this.inputTwoChange = this.inputTwoChange.bind(this);
    }

    inputOneChange(e) {
        this.setState({
            text: e.target.value
        });
    }
    inputTwoChange(e) {
        this.setState({
            number: e.target.value
        });
    }

    render() {
        return (
            <div>
                <StyledContainer
                    title="Form Label"
                    className="FormLabelView"
                    description={(
                        <p>Below is an example of how to use the FormLabel component</p>
                    )}
                >
                    <StyledRow>
                        <div>
                            <FormLabel
                                label="Text Input"
                                message="Must contain at least one capital letter"
                                pattern={/(?=.*[A-Z])/}
                                required={true}
                                requiredLabel="*"
                                value={this.state.text}
                            />
                            <input type="text" onChange={this.inputOneChange} value={this.state.text}/>
                        </div>
                        <div>
                            <FormLabel
                                label="Number Input"
                                message="Must be more than 5 numbers"
                                pattern={/\d{6,}/}
                                required={true}
                                requiredLabel="*"
                                value={this.state.number}
                            />
                            <input type="number" onChange={this.inputTwoChange} value={this.state.number}/>
                        </div>
                    </StyledRow>

                    <StyledRow>
                        <div>
                            <FormLabel label="Just a regular text input">
                                This is a description for the label
                            </FormLabel>
                            <input type="text"/>
                        </div>
                    </StyledRow>
                </StyledContainer>

                <StyledContainer
                    title="Usage"
                    className="ModalCode"
                >
                    <pre>{code}</pre>
                </StyledContainer>
            </div>
        )
    }
}


const code = 
`import React from 'react';
import FormLabel from '../../common/form-label';

export default class ModalView extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            text: ""
        }
        this.inputChange = this.inputChange.bind(this);
    }

    inputChange(e) {
        this.setState({
            text: e.target.value
        });
    }

    render() {
        return (
            <div>
                <FormLabel
                    label="Text Input"
                    message="Must contain at least one capital letter"
                    pattern={/(?=.*[A-Z])/}
                    required={true}
                    requiredLabel="*"
                    value={this.state.text}
                >
                    This is an optional description for your form label
                </FormLabel>
                <input type="text" onChange={this.inputChange} value={this.state.text}/>
            </div>
        )
    }
}`;