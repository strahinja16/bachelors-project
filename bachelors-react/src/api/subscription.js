import axios from './index';

export function subscribe(cost) {
  return axios.post('/subscription/subscribe', { cost });
}

export function unsubscribe() {
  return axios.post('/subscription/unsubscribe');
}
