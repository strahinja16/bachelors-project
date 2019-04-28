
import axios from '.';

export function login() {
  return axios.get('/auth/login');
}
