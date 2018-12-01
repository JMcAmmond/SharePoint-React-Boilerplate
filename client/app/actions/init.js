import * as types from './types';

/**
 * Initialize the form
 */
export function initialize() {
    return(dispatch, getState) => {
        dispatch({
            type: types.INITIALIZED,
            payload: true
        });
    }
}