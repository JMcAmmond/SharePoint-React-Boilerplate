import React from 'react';
import { HashRouter, Route } from "react-router-dom";
import ErrorBoundary from '../common/error-boundary';
import Navigation from './navigation';
import { 
    HomeView, 
    StyledContainerRowView,
    PeoplePickerView,
    CommentsView,
    ModalView,
    AttachmentsView,
    SignatureCanvasView,
    FormLabelView,
    ErrorBoundaryView
} from './index';

import '../common/styles/assimilate-theme.scss';
import './styles/application.scss';

export default class Application extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <ErrorBoundary>
                <HashRouter>
                    <div className="Application assimilate-theme">
                        <Navigation/>
                        <Route exact path="/" component={HomeView} />
                        <Route exact path="/styled-container-row" component={StyledContainerRowView} />
                        <Route exact path="/people-picker" component={PeoplePickerView} />
                        <Route exact path="/comments" component={CommentsView} />
                        <Route exact path="/modal" component={ModalView} />
                        <Route exact path="/attachments" component={AttachmentsView} />
                        <Route exact path="/signature-canvas" component={SignatureCanvasView} />
                        <Route exact path="/form-label" component={FormLabelView} />
                        <Route exact path="/error-boundary" component={ErrorBoundaryView} />
                    </div>
                </HashRouter>
            </ErrorBoundary>
        )
    }
}