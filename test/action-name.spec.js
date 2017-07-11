import actionName from '../src/action-name';
import { ACTION_PREFIX, ACTION_SEPARATOR } from '../src/constants';

const prefix = `${ACTION_PREFIX}${ACTION_SEPARATOR}`;

describe('actionName', () => {
    it('should prefix action names', () => {
        const action = actionName('action');
        expect(action).toBe(`${prefix}action`);
    });

    it('should not prefix prefixed action names', () => {
        const name = `${prefix}another`;
        const action = actionName(name);
        expect(action).toBe(name);
    });
});
