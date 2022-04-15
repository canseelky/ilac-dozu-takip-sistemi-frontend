import axios from '../config/@axios';

export const confirmCode = data => {
  const request = axios.post(
    '/auth/checkVerificationCode',
    JSON.stringify(data),
  );
  return request;
};

export const login = data => {
  const request = axios.post('/auth/login', data);
  return request;
};
