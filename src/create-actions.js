// @flow
import invariant from 'invariant';
import isEmpty from 'is-empty';
import isString from 'is-string';
import isFunction from 'is-function';
import actionName from './action-name';
import { ACTION_PREFIX } from './constants';
import type {
    ReduxNamespaces$CreatorsMap,
    ReduxNamespaces$ActionCreator
} from '../flow/types';

export default (
    namespace: string,
    creatorsMap: ReduxNamespaces$CreatorsMap = {}
): ReduxNamespaces$CreatorsMap => {
    invariant(
        !isEmpty(namespace) || !isString(namespace),
        'Expected namespace to be a string, got undefined or empty'
    );

    // construct a map for redux-actions
    return Object.keys(creatorsMap).reduce((creators, key) => {
        const creator: ReduxNamespaces$ActionCreator = creatorsMap[key];

        invariant(
            isFunction(creator),
            `Expected creator to be a function, ${typeof creator}`
        );

        return {
            ...creators,
            [key](...args) {
                const action = creator(...args) || {};
                const actionType = action.type;

                invariant(
                    !isEmpty(actionType) || !isString(actionType),
                    'Expected action.type to be a string, got undefined or empty'
                );

                return {
                    ...action,
                    type: actionName(actionType),
                    [ACTION_PREFIX]: {
                        actionType,
                        namespace,
                    },
                };
            },
        };
    }, {});
};
