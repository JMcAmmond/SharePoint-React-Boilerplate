import React from 'react';
import './styles/application.scss';

export default class Application extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className="Application">
                This is the beginning of the application :)
            </div>
        )
    }
}
