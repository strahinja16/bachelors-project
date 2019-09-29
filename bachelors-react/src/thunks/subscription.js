
import { loginUser } from '../reducers/auth';
import { subscribe as subscribeApi, unsubscribe as unsubscribeApi } from '../api/subscription';

export function subscribe() {
  return dispatch => subscribeApi()
    .then(({ data: { storefront, auth } }) => {
      dispatch(loginUser(auth));
      localStorage.setItem('_token', auth.token);
      return storefront;
    });
}

export function unsubscribe() {
  return dispatch => unsubscribeApi()
    .then(({ data }) => {
      dispatch(loginUser(data));
      localStorage.setItem('_token', data.token);
    });
}
