import cloneDeep from 'lodash/cloneDeep';
import * as types from './types';

/**
 * 
 * @return {Action}
 */
export function IncrementCounter(steps) {
    return(dispatch, getState) => {
        let currentCount = parseInt(cloneDeep(getState().counter));

        dispatch({
            type: types.INCREMENT_COUNTER,
            payload: currentCount + parseInt(steps),
        });
    }
}

/**
 * 
 * @return {Action}
 */
export function DecrementCounter(steps) {
    return(dispatch, getState) => {
        let currentCount = parseInt(cloneDeep(getState().counter));

        dispatch({
            type: types.DECREMENT_COUNTER,
            payload: currentCount - parseInt(steps),
        });
    }
}