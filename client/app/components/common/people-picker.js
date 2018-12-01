import React from 'react';
import Api from '../../lib/api';
import Select from 'react-select';
import findIndex from 'lodash/findIndex';
import 'react-select/dist/react-select.css';
import isEmpty from 'lodash/isEmpty';

export default class PeoplePicker extends React.Component {
    constructor(props) {
        super(props);
        this.ensureSingleUser = this.ensureSingleUser.bind(this);
    }

    /**
     * Pass values back to onChange prop when the value has changed
     * @param users
     */
    onChange(users) {
        //Nothing to ensure
        if(users === undefined || users === null || isEmpty(users)) {
            this.props.onChange(users);
        }
        else {
            //Get the last user in the array or the only user
            let userToEnsure = users.length 
                ? users.pop()
                : users;

            this.ensureSingleUser(userToEnsure, users);
        }
    }

    /**
     * Ensure a user in the sharepoint site
     * @param  {Object} user
     * @param  {Array | Object} users
     */
    ensureSingleUser(user, users) {
        let self = this;

        Api.post(
            `${APP_CONFIG.site.url}/_api/web/ensureuser`,
            {logonName: 'i:0#.f|membership|' + user.value}
        ).then(function(resp) {
            user.id = resp.d.Id;

            //Put that user back how you found it
            if(users.length !== undefined) {
                users.push(user);
            } else {
                users = user;
            }

            self.props.onChange(users);
        }).catch(function(ex) {
            return Promise.reject(new Error(ex));
        });
    }

    getUsers(input) {
        let self = this;
        let filters = '';

        /**
         * Return nothing if no input provided
         */
        if (!input) {
            return Promise.resolve({ options: [] });
        }

        if(self.props.excludedUsers.length) {
            self.props.excludedUsers.forEach((item) => {
                filters += ` and (WorkEmail ne '${item}')`;
            });
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
                    ${filters}
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
                loadOptions={this.getUsers.bind(this)}
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
    excludedUsers: [],
}