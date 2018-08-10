import createReducer from '../lib/createReducer';
import * as types from '../actions/types';

/**
 * Saving
 */
export const saving = createReducer(false, {
    [types.SAVING](state, action) {
        return action.saving
    }
})