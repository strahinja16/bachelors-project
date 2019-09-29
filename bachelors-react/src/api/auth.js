
import axios from '.';

export function login({ email, password }) {
  return axios.post('/auth/login', {
    email,
    password,
  });
}

export function signUp({
  firstName, lastName, companyName, email, password, country,
}) {
  return axios.post('/auth/sign-up', {
    firstName,
    lastName,
    companyName,
    email,
    password,
    country,
  });
}

export function forgotPassword(email) {
  return axios.post('/auth/forgot-password', {
    email,
  });
}

export function resetPassword(password, token) {
  return axios.post('/auth/reset-password', {
    password,
    token,
  });
}

export function verifyToken(token) {
  return axios.post('/auth/verify-token', {
    token,
  });
}
