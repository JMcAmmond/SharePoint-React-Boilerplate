import { combineReducers } from 'redux';
import * as InitializeReducer from './init';

/**
 * Combine all reducers into the combineReducers object
 */
export default combineReducers(Object.assign(
    InitializeReducer
));