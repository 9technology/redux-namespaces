import createReducer from '../src/create-reducer';
import actionName from '../src/action-name';
import { ACTION_PREFIX } from '../src/constants';

jest.mock('../src/action-name', () => jest.fn());

describe('#createReducer()', () => {
    it('throw if non-function is given', () => {
        expect(createReducer.bind(undefined, 'foo')).toThrow(/reducers to be functions/);
    });

    it('should return empty object as default state', () => {
        const reducer = createReducer(() => {});

        actionName.mockReturnValueOnce('changed');

        expect(reducer()).toEqual({});
    });

    it('should return a reducer function', () => {
        expect(createReducer(() => {})).toEqual(expect.any(Function));
    });

    it('should return state on non-namespaced actions', () => {
        const reducer = createReducer(() => {});
        const state = {};

        actionName.mockReturnValueOnce('changed');

        expect(reducer(state, { action: 'test' })).toBe(state);
    });

    it('should call original reducers with un-namespaced state and action', () => {
        expect.assertions(2);

        const one = jest.fn();
        const two = jest.fn();
        const reducer = createReducer(one, two);
        const action = {
            type: 'changed',
            test: true,
            [ACTION_PREFIX]: {
                namespace: 'foo',
                actionType: 'action',
            },
        };
        const foo = {};

        actionName.mockReturnValueOnce('changed');
        one.mockReturnValueOnce(foo);

        reducer({ foo }, action);

        const match = {
            type: 'action', // actionType
            test: true,
        };

        expect(one).toHaveBeenCalledWith(foo, match);
        expect(two).toHaveBeenCalledWith(foo, match);
    });

    it('should return namespaced state', () => {
        const reduce = jest.fn();
        const reducer = createReducer(reduce);
        const action = {
            type: 'changed',
            [ACTION_PREFIX]: {
                namespace: 'foo',
                actionType: 'action',
            },
        };

        actionName.mockReturnValueOnce('changed');
        reduce.mockReturnValueOnce('bar');

        expect(reducer({ test: true }, action)).toEqual({
            test: true,
            foo: 'bar',
        });
    });
});
