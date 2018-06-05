# Redux Namespaces

[![Build Status](https://travis-ci.org/9technology/redux-namespaces.svg?branch=master)](https://travis-ci.org/9technology/redux-namespaces) [![Coverage Status](https://coveralls.io/repos/github/9technology/redux-namespaces/badge.svg)](https://coveralls.io/github/9technology/redux-namespaces)

Namespace Redux actions, reducers and state.

## Usage
---

Build re-usable components in React, or any other UI library, using Redux adds complexity. Namespacing actions, reducers and state allows multiple instances of components to co-exist with independent state.

Read more: [https://www.nine.com.au/tech/2017/07/13/09/40/redux-namespaces](https://www.nine.com.au/tech/2017/07/13/09/40/redux-namespaces)

### Reducers

When handling multiple components and computing derived data an application's reducer must be aware of this nature. Usually when reducing the action it passes some meta data. This meta data sometimes changes the returning state structure.

Using `createReducer()`, reducers can be written without the need of this meta data. For example, our state has two superhereos and the application sets their side kick. The reducer is written as if it only had a single superhero. So no longer do reducers have to be instance aware. Regardless if it's batman or superman the reducer will set the side kick.

```javascript
import { createStore } from 'redux';
import { createReducer } from 'redux-namespaces';

// Always set the initial state, see Caveats below
const initial = {
  batman: {},
  superman: {}
};

// Generic superhero reducer
const superheroReducer = (state, action) => {
  switch (action.type) {
    case 'SET_SIDE_KICK':
      return {
        ...state,
        sideKick: action.sideKick,
      };
    default:
      return state;
  }
};

// Make the generic reducer namespace aware
const reducer = createReducer(superheroReducer);
const store = createStore(reducer, initial);
```

### Action Creators

Action creators now don't require the meta data for the reducer. Since the reducer is built for a single superhero actions can now follow the same pattern.

```javascript
const actions = {
  sideKick(sideKick) {
    return {
      type: 'SET_SIDE_KICK',
      sideKick,
    };
  }
};
```

Use `createActions()` with a given state namespace and the actions list to generate action creators.

```javascript
import { createActions } from 'redux-namespaces';

// Namespace actions
const batman = createActions('batman', actions);
const superman = createActions('superman', actions);
```

`batman` and `superman` can now disptach the same actions to the reducer but state independent.

```javascript
// Dispatch
store.dispatch(batman.sideKick('Robin'));
store.dispatch(superman.sideKick('Jimmy Olsen'));

store.getState(); // { batman: { sideKick: 'Robin' }, superman: { sideKick: 'Jimmy Olsen'} }
```

### React

Combine Redux Namespaces with React following the usual `react-redux` setup. However use `createActions` for `mapDispatchToProps()`.

```javascript
const mapDispatchToProps = dispatch =>
  bindActionCreators(
    createActions('namespace', {
      propAction() {
        return { type: 'action' };
      }
    })
  );
```

### Caveats
---

Initial namespaces must be set within the initial state otherwise action creators will dispatch to an undefined property within the state.

## API
---

#### `createActions(namespace, actions)`

- `namespace` _String_ The namespace for the action creators.
- `actions` _Object_ Action creators to namespace.

_Returns namespaced action creators._

#### `createReducers(...reducers)`

- `reducers` _Function|[]Function_ Redux reducer.

_Returns wrapped reducer that is namespace aware._

## License
---

[BSD-3-Clause](LICENSE)

Copyright (c) 2017 [9Technology](https://github.com/9technology)
