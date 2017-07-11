// @flow
export type ReduxNamespaces$ActionCreator = (...args: Array<any>) => Object;

export type ReduxNamespaces$CreatorsMap = {
    [name: string]: ReduxNamespaces$ActionCreator
};

export type ReduxNamespaces$Reducer = (state: Object, action: Object) => Object;
