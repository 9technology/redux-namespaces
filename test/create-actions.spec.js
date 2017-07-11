import createActions from '../src/create-actions';
import actionName from '../src/action-name';
import { ACTION_PREFIX } from '../src/constants';

jest.mock('../src/action-name', () => jest.fn());

describe('#createActions()', () => {
    it('should throw error without namespace', () => {
        expect(createActions.bind(undefined, '')).toThrow(/namespace to be a string/);
    });

    it('should throw error on non-string namespace', () => {
        expect(createActions.bind(undefined, null)).toThrow(/namespace to be a string/);
    });

    it('should return object', () => {
        expect(createActions('test')).toEqual({});
    });

    it('should throw if creator is not a function', () => {
        expect(createActions.bind(undefined, 'test', { foo: 'bar' })).toThrow(/creator to be a function/);
    });

    it('should return same keys', () => {
        const actions = createActions('test', {
            foo() {},
            bar() {},
        });

        expect(actions).toEqual(
            expect.objectContaining({
                foo: expect.any(Function),
                bar: expect.any(Function),
            })
        );
    });

    it('should call creator', () => {
        const creator = jest.fn(() => ({ type: 'action' }));
        const actions = createActions('test', { foo: creator });

        actions.foo(1, 'string', true);
        expect(creator).toHaveBeenCalledWith(1, 'string', true);
    });

    it('should throw if no action type', () => {
        const creator = jest.fn();
        const actions = createActions('test', { foo: creator });

        expect(actions.foo).toThrow(/action\.type to be a string/);
    });

    it('should throw if no action type', () => {
        const creator = jest.fn(() => ({ type: '' }));
        const actions = createActions('test', { foo: creator });

        expect(actions.foo).toThrow(/action\.type to be a string/);
    });

    it('should call actionName', () => {
        const creator = jest.fn(() => ({ type: 'action', foo: 'bar' }));
        const actions = createActions('test', { foo: creator });

        actionName.mockReturnValueOnce('changed');

        const action = actions.foo();

        expect(action).toEqual({
            type: 'changed',
            foo: 'bar',
            [ACTION_PREFIX]: {
                actionType: 'action',
                namespace: 'test',
            },
        });
    });
});
