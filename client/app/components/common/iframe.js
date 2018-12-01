import React from 'react';
import './styles/iframe.scss';

export default class Iframe extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div>
                <iframe className="iframe" src={this.props.url}/>
            </div>
        )
    }
}

Iframe.defaultProps = {
    url: '../Shared Documents/Forms/AllItems.aspx'
}