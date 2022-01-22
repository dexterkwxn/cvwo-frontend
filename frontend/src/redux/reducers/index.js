//The reducer is a pure function that takes the previous state and an action, and returns the next state.

import { combineReducers } from 'redux';
import TaskReducer from './TaskReducer';

const allReducers = combineReducers({
  task: TaskReducer,
});

const rootReducer = (state, action) => {
  return allReducers(state, action);
};

export default rootReducer;