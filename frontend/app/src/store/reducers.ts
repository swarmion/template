import { combineReducers } from 'redux';

import { reducer as user, initialState as userInitialState } from './user';

export const rootInitialState = {
  user: userInitialState,
};

const rootReducers = combineReducers({
  user,
});

export default rootReducers;
