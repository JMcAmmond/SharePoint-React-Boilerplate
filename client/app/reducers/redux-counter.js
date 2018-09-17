import createReducer from '../lib/createReducer';
import * as types from '../actions/types';

/**
 * Redux Counter
 */
export const counter = createReducer(0, {
    [types.INCREMENT_COUNTER](state, action) {
        return action.payload
    },

    [types.DECREMENT_COUNTER](state, action) {
        return action.payload
    },
})