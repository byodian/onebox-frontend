import Request from '../utils/request';

const baseUrl = '/users';

export const loginApi = (data) => Request({
  url: `${baseUrl}/authenticate`,
  method: 'post',
  data,
});

export const createUserApi = (data) => Request({
  url: `${baseUrl}`,
  method: 'post',
  data,
});
