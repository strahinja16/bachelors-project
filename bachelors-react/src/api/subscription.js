import axios from './index';

export function subscribe() {
  return axios.post('/subscription/subscribe');
}

export function unsubscribe() {
  return axios.post('/subscription/unsubscribe');
}
