import createReducer from '../lib/createReducer';
import * as types from '../actions/types';

/**
 * Initialized
 */
export const initialized = createReducer(false, {
    [types.INITIALIZED](state, action) {
        return action.payload
    },
});

export const failed = createReducer(false, {
    [types.FAILED](state, action) {
        return action.payload
    },
});

export const restricted = createReducer(false, {
    [types.RESTRICTED](state, action) {
        return action.payload
    },
});