
import { loginUser } from '../reducers/auth';
import { login as loginApi } from '../api/auth';

export default function login() {
  return dispatch => loginApi()
    .then(({ data: { token } }) => {
      dispatch(loginUser({ token }));
      localStorage.setItem('_token', token);
    });
}
