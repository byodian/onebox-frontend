import axios from 'axios';

const baseUrl = '/api/users';

const login = async (credentials) => {
  const response = await axios.post(`${baseUrl}/authenticate`, credentials);
  return response.data;
};

const create = async (newUser) => {
  const user = await axios.post(baseUrl, newUser);
  return user.data;
};

const userService = {
  create,
  login,
};

export default userService;
