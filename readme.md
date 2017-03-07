redux-compose-hors
=====================

Compose higher order reducers

[![Build Status](https://travis-ci.org/l2silver/redux-compose-hors.svg?branch=master)](https://travis-ci.org/l2silver/redux-compose-hors)


## Why
If you use two or more higher order reducers, then the actions of those reducers must follow the same order that the higher order reducers are in. Furthermore, those reducers cannot be nested beyond two degrees.

```
npm install --save redux-compose-hors
```

## Usage

```
import {createStore} from 'redux';
import {batchActions, enableBatching} from 'redux-batched-actions';
import {retypeAction, enableRetyping} from 'redux-retype-actions';
import composeHors from 'redux-compose-hors';
import {createAction} from 'redux-actions';

const doThing = createAction('DO_THING')
const doOther = createAction('DO_OTHER')

function reducer(state, action) {
  switch (action.type) {
    case 'DO_THING': return 'thing'
    case 'DO_OTHER': return 'other'
    default: return state
  }
}

const store = createStore(composeHors(reducer, enableRetyping, enableBatching), initialState)
const doMultipleThings = retypeAction('DO_MULTIPLE_THINGS', batchActions([doThing(), doOther()]))
const doMultipleThingsTwice = batchActions([doMultipleThings, doMultipleThings])
store.dispatch(doMultipleThingsTwice)
```