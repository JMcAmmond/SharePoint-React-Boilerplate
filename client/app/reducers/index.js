import { combineReducers } from 'redux';
import * as CommonReducer from './common';

/**
 * Combine all reducers into the combineReducers object
 */
export default combineReducers(Object.assign(
	CommonReducer
));