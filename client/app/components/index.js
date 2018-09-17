import React from 'react';
import Loadable from 'react-loadable';

function Loading() {
    return <div>Loading</div>
}

export const Application = Loadable({
    loader: () => import(/* webpackChunkName: "Application" */ './example/application'),
    loading() {
        return <span></span>
    }
});

export const Home = Loadable({
    loader: () => import(/* webpackChunkName: "Home" */ './example/home'),
    loading: Loading
});

export const About = Loadable({
    loader: () => import(/* webpackChunkName: "About" */ './example/about'),
    loading: Loading
});

export const ReduxCounter = Loadable({
    loader: () => import(/* webpackChunkName: "ReduxCounter" */ './example/redux-counter'),
    loading: Loading
});