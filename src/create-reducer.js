// @flow
import reduce from 'reduce-reducers';
import flatten from 'array-flatten';
import omit from 'object.omit';
import actionName from './action-name';
import { ACTION_PREFIX } from './constants';
import type { ReduxNamespaces$Reducer } from '../flow/types';

export default (...args: Array<ReduxNamespaces$Reducer>): ReduxNamespaces$Reducer => {
    const reducers = flatten(args);
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
