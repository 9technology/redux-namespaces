import { isString } from 'lodash';
import { ACTION_PREFIX, ACTION_SEPARATOR } from './constants';

export default fn => (...args) => {
    const action = fn(...args);

    // check if creator changed the type
    if (isString(action.payload.type)) {
        const type = action.payload.type;

        action.type = `${ACTION_PREFIX}${ACTION_SEPARATOR}${type}`;
        action.meta.actionType = type;

        delete action.payload.type;
    }

    return action;
};
