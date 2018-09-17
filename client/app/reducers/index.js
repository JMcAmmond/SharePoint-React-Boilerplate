import { combineReducers } from 'redux';
import * as ReduxCounterReducer from './redux-counter';

/**
 * Combine all reducers into the combineReducers object
 */
export default combineReducers(Object.assign(
    ReduxCounterReducer,
));