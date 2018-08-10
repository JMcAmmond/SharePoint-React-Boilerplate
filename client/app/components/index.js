import React from 'react';
import Loadable from 'react-loadable';

function Loading() {
    return <div>Loading</div>
}

export const Home = Loadable({
    loader: () => import(/* webpackChunkName: "Home" */ './common/home'),
    loading: Loading
});

export const Example = Loadable({
    loader: () => import(/* webpackChunkName: "Example" */ './common/example'),
    loading: Loading
});

export const About = Loadable({
    loader: () => import(/* webpackChunkName: "About" */ './common/about'),
    loading: Loading
});