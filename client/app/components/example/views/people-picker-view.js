import React from 'react';
import StyledContainer from '../../common/styled-container';
import StyledRow from '../../common/styled-row';
import PeoplePicker from '../../common/people-picker';

export default class PeoplePickerView extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            singleUser: null,
            multiUser: []
        }
    }

    singleUserChange(value) {
        this.setState({
            singleUser: value
        });
    }

    multiUserChange(value) {
        this.setState({
            multiUser: value
        });  
    }

    render() {
        return (
            <div>
                <StyledContainer
                    className="PeoplePickerView"
                    title="People Picker"
                    description={(
                        <p>Below is an example of how to use the PeoplePicker component</p>
                    )}
                >
                    <StyledRow>
                        <div>
                            <label>Single User</label>
                            <PeoplePicker
                                onChange={this.singleUserChange.bind(this)}
                                disabled={false}
                                placeholder="Please select a single user"
                                multi={false}
                                value={this.state.singleUser}
                            />
                        </div>

                        <div>
                            <label>Multi User</label>
                            <PeoplePicker
                                onChange={this.multiUserChange.bind(this)}
                                disabled={false}
                                placeholder="Please select multiple users"
                                multi={true}
                                value={this.state.multiUser}
                            />
                        </div>
                    </StyledRow>
                </StyledContainer>

                <StyledContainer
                    className="PeoplePickerExampleCode"
                    title="Usage"
                >
                	<pre>{code}</pre>
                </StyledContainer>
            </div>
        )
    }
}



const code = 
`import React from 'react';
import PeoplePicker from '../common/people-picker';

export default class PeoplePickerView extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            singleUser: null,
            multiUser: []
        }
    }

    singleUserChange(value) {
        this.setState({
            singleUser: value
        });
    }

    multiUserChange(value) {
        this.setState({
            multiUser: value
        });  
    }

    render() {
        return (
            <div>
                <label>Single User</label>
                <PeoplePicker
                    onChange={this.singleUserChange.bind(this)}
                    disabled={false}
                    placeholder="Please select a single user"
                    multi={false}
                    value={this.state.singleUser}
                />
            
                <label>Multi User</label>
                <PeoplePicker
                    onChange={this.multiUserChange.bind(this)}
                    disabled={false}
                    placeholder="Please select multiple users"
                    multi={true}
                    value={this.state.multiUser}
                />
            </div>
        )
    }
}`;