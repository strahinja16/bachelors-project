
import { Map } from 'immutable';
import { createAction, handleActions } from 'redux-actions';
import { LOGIN_ACTION } from '../consts/actions';

// CREATE ACTIONS
export const loginUser = createAction(LOGIN_ACTION);

// SET INITIAL STATE
const INITIAL_STATE = Map({
  token: null,
});

// WRITE HANDLERS FOR ACTIONS
export default handleActions(
  {
    [LOGIN_ACTION](state, { payload }) {
      return state.merge({
        token: payload.token,
      });
    },
  },
  INITIAL_STATE,
);
