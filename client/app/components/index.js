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