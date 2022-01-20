//The reducer is a pure function that takes the previous state and an action, and returns the next state.

import { combineReducers } from 'redux';
import BlockReducer from './BlockReducer';

const allReducers = combineReducers({
  block: BlockReducer,
});

const rootReducer = (state, action) => {
  return allReducers(state, action);
};

export default rootReducer;