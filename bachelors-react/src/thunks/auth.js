
import { loginUser, logoutUser } from '../reducers/auth';
import { login as loginApi } from '../api/auth';

export function logout() {
  return (dispatch) => {
    dispatch(logoutUser());
    localStorage.removeItem('_token');
  };
}

export function login(payload) {
  return dispatch => loginApi(payload)
    .then(({ data }) => {
      dispatch(loginUser(data));
      localStorage.setItem('_token', data.token);
    });
}
