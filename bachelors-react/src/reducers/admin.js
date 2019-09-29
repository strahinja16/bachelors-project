
import { Map } from 'immutable';
import { createAction, handleActions } from 'redux-actions';
import { SET_USERS_ACTION } from '../consts/actions';

// CREATE ACTIONS
export const setUsers = createAction(SET_USERS_ACTION);

// SET INITIAL STATE
const INITIAL_STATE = Map({
  users: null,
});

// WRITE HANDLERS FOR ACTIONS
export default handleActions(
  {
    [SET_USERS_ACTION](state, { payload }) {
      return state.set('users', payload);
    },
  },
  INITIAL_STATE,
);
