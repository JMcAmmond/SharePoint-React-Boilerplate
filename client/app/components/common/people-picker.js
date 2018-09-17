import React from 'react';
import Api from '../../lib/api';
import Select from 'react-select';
import 'react-select/dist/react-select.css';

export default class PeoplePicker extends React.Component {
    constructor(props) {
        super(props);
    }

	/**
	 * Pass values back to onChange prop when the value has changed
	 * @param value
	 */
    onChange(value) {
        this.props.onChange(value);
    }

    getUsers(input) {
		/**
		 * Return nothing if no input provided
		 */
        if (!input) {
            return Promise.resolve({ options: [] });
        }

		/**
		 * Query for user based on input from select box
		 */
        return Api.get(
            `/_vti_bin/ListData.svc/UserInformationList
                ?$select=
                    Id,Name,WorkEmail,ContentType
                &$filter=
                    substringof('${input}', Name) 
                    and 
                    (ContentType eq 'Person')
            `
        )
        .then(function (resp) {
            let options = [];
            let users = resp.d.results;

            //Convert response to 'react-select' format
            for (let i = 0; i < users.length; i++) {
                if (users[i].WorkEmail !== undefined && users[i].WorkEmail !== '' && users[i].WorkEmail !== null) {
                    options.push({
                        value: users[i].WorkEmail,
                        label: `${users[i].Name} <${users[i].WorkEmail}>`,
                        id: users[i].Id
                    });
                }
            }

            return { options }
        }).catch(function (ex) {
            console.log(ex);
            return { options: [] }
        });
    }

	/**
	 * Remove the email address when displaying users that have been chosen
	 * @param value
	 * @returns {*}
	 */
    filterValues(value) {
        //Values is empty
        if (value === null || (!this.props.multi && value.label === undefined) || value.length === 0) { return value; }

        //Remove email from label
        if (this.props.multi) {
            value[value.length - 1].label = value[value.length - 1].label.replace(/<.*?>/g, "");
        } else {
            value.label = value.label.replace(/<.*?>/g, "");
        }

        return value;
    }

    render() {
		/**
		 * Determine if the creatable input should be allowed
		 */
        const AsyncComponent = this.props.creatable
            ? Select.AsyncCreatable
            : Select.Async;

        return (
            <AsyncComponent
                name="user-select"
                multi={this.props.multi}
                onChange={this.onChange.bind(this)}
                loadOptions={this.getUsers}
                value={this.filterValues(this.props.value)}
                placeholder={this.props.placeholder}
                disabled={this.props.disabled}
            />
        )
    }
}

PeoplePicker.defaultProps = {
    multi: false,
    value: [],
    placeholder: 'Please select a user',
    disabled: false,
    creatable: false,
}