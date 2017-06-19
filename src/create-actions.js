import invariant from 'invariant';
import { createActions } from 'redux-actions';
import {
    isEmpty,
    isString,
    snakeCase,
    upperCase,
    isFunction,
    identity,
    camelCase
} from 'lodash';
import metaCreator from './meta-creator';
import wrapCreator from './wrap-creator';
import { ACTION_PREFIX, ACTION_SEPARATOR } from './constants';

export default (namespace, creatorsMap = {}) => {
    invariant(
        !isEmpty(namespace) || !isString(namespace),
        'Expected namespace to be a string, got undefined or empty'
    );

    // construct a map for redux-actions
    const actionsMap = Object.keys(creatorsMap).reduce((creators, key) => {
        let creator = creatorsMap[key];
        let type;

        // swap string creators
        if (isString(creator)) {
            [type, creator] = [creator, identity];
        } else {
            type = upperCase(snakeCase(key)); // fooBar => FOO_BAR
        }

        invariant(
            isFunction(creator),
            `Expected creator to be a function, ${typeof creator}`
        );

        return {
            ...creators,
            [type]: [
                creator,
                metaCreator(namespace, type),
            ],
        };
    }, {});

    const actions = createActions(
        { [ACTION_PREFIX]: actionsMap },
        { namespace: ACTION_SEPARATOR }
    );
    const actionsKey = camelCase(ACTION_PREFIX);

    // return the same hash structure
    return Object.keys(actions[actionsKey]).reduce((creators, type) => ({
        ...creators,
        [type]: wrapCreator(actions[actionsKey][type]),
    }), {});
};
