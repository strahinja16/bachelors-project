import axios from './index';

// eslint-disable-next-line import/prefer-default-export
export function getUsers() {
  return axios.get('/admin');
}
