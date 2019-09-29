import { getUsers as getUsersApi } from '../api/admin';
import { setUsers } from '../reducers/admin';

// eslint-disable-next-line import/prefer-default-export
export function getUsers() {
  return dispatch => getUsersApi()
    .then(({ data }) => {
      dispatch(setUsers(data));
    });
}
