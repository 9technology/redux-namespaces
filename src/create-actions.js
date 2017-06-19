import invariant from 'invariant';
import isEmpty from 'is-empty';
import isString from 'is-string';
import isFunction from 'is-function';
import snakeCase from 'to-snake-case';
import actionName from './action-name';
import { ACTION_PREFIX } from './constants';

export default (namespace, creatorsMap = {}) => {
    invariant(
        !isEmpty(namespace) || !isString(namespace),
        'Expected namespace to be a string, got undefined or empty'
    );

    // construct a map for redux-actions
    return Object.keys(creatorsMap).reduce((creators, key) => {
        let creator = creatorsMap[key];
        let methodType;

        // swap string creators
        if (isString(creator)) {
            [methodType, creator] = [creator, v => v];
        } else {
            methodType = snakeCase(key).toUpperCase(); // fooBar => FOO_BAR
        }

        invariant(
            isFunction(creator),
            `Expected creator to be a function, ${typeof creator}`
        );

        return {
            ...creators,
            [key](...args) {
                const action = creator(...args) || {};
                let actionType = methodType;

                if (action.type && action.type !== methodType) {
                    actionType = action.type;
                }

                return {
                    ...action,
                    type: actionName(actionType),
                    [ACTION_PREFIX]: {
                        actionType,
                        methodType,
                        namespace,
                    },
                };
            },
        };
    }, {});
};
