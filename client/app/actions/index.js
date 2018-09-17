import * as ReduxCounterActions from './redux-counter';

/**
 * Combine all actions into the ActionCreators Object
 * @type {*}
 */
export const ActionCreators = Object.assign({},
    ReduxCounterActions,
);