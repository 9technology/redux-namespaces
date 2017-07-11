// @flow
import reduce from 'reduce-reducers';
import flatten from 'array-flatten';
import omit from 'object.omit';
import invariant from 'invariant';
import isFunction from 'is-function';
import actionName from './action-name';
import { ACTION_PREFIX } from './constants';
import type { ReduxNamespaces$Reducer } from '../flow/types';

export default (...args: Array<ReduxNamespaces$Reducer>): ReduxNamespaces$Reducer => {
    const reducers = flatten(args);

    invariant(
        reducers.every(isFunction),
        'Expecting reducers to be functions'
    );

    const reducer = reduce(...reducers);

    return (state: Object, action: Object): Object => {
        // namespace actions only
        if (actionName(action.type) !== action.type) {
            return state;
        }

        const { namespace, actionType } = action[ACTION_PREFIX];

        // reduce the state at the namespace
        const current = state[namespace];
        const updated = reducer(current, omit({
            ...action,
            type: actionType,
        }, [ACTION_PREFIX]));

        return {
            ...state,
            [namespace]: updated,
        };
    };
};
