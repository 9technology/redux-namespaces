// @flow
declare type Action = {
    type: string,
};

export type ReduxNamespaces$ActionCreator = (...args: Array<any>) => Action;

export type ReduxNamespaces$CreatorsMap = {
    [name: string]: ReduxNamespaces$ActionCreator
};

export type ReduxNamespaces$Reducer = (state: Object, action: Object) => Object;
