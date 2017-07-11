// @flow
import type {
    ReduxNamespaces$Reducer,
    ReduxNamespaces$CreatorsMap
} from './types';

declare module 'redux-namespaces' {
    declare export var ACTION_PREFIX: string;
    declare export var ACTION_SEPARATOR: string;
    declare export function createActions<C: ReduxNamespaces$CreatorsMap>(namespace: string, creatorsMap: C): C;
    declare export function createReducer<R: ReduxNamespaces$Reducer>(...reducers: Array<R>): R;
}
