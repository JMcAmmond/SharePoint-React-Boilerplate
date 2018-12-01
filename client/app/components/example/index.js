import React from 'react';
import Loadable from 'react-loadable';

function Loading() {
    return <div>Loading</div>
}

export const HomeView = Loadable({
    loader: () => import(/* webpackChunkName: "Home" */ './views/home-view'),
    loading() {
        return <span></span>
    }
});

export const StyledContainerRowView = Loadable({
    loader: () => import(/* webpackChunkName: "StyledContainerRow" */ './views/styled-container-row-view'),
    loading() {
        return <span></span>
    }
});

export const PeoplePickerView = Loadable({
    loader: () => import(/* webpackChunkName: "PeoplePicker" */ './views/people-picker-view'),
    loading() {
        return <span></span>
    }
});

export const CommentsView = Loadable({
    loader: () => import(/* webpackChunkName: "Comments" */ './views/comments-view'),
    loading() {
        return <span></span>
    }
});

export const ModalView = Loadable({
    loader: () => import(/* webpackChunkName: "Modal" */ './views/modal-view'),
    loading() {
        return <span></span>
    }
});

export const AttachmentsView = Loadable({
    loader: () => import(/* webpackChunkName: "Attachments" */ './views/attachments-view'),
    loading() {
        return <span></span>
    }
});

export const SignatureCanvasView = Loadable({
    loader: () => import(/* webpackChunkName: "SignatureCanvas" */ './views/signature-canvas-view'),
    loading() {
        return <span></span>
    }
});

export const FormLabelView = Loadable({
    loader: () => import(/* webpackChunkName: "FormLabel" */ './views/form-label-view'),
    loading() {
        return <span></span>
    }
});

export const ErrorBoundaryView = Loadable({
    loader: () => import(/* webpackChunkName: "ErrorBoundary" */ './views/error-boundary-view'),
    loading() {
        return <span></span>
    }
});