import reduce from 'reduce-reducers';
import { flatten } from 'lodash';
import isNamespaceAction from './is-namespace-action';

export default (...args) => {
    const reducers = flatten(args);
    const reducer = reduce(...reducers);

    return (state = {}, action) => {
        // namespace actions
        if (!isNamespaceAction(action)) {
            return state;
        }

        const { namespace, actionType } = action.meta;

        // reduce the state at the namespace
        const current = state[namespace];
        const updated = reducer(current, {
            ...action.payload,
            type: actionType,
        });

        return {
            ...state,
            [namespace]: updated,
        };
    };
};
