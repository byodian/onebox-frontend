import axios from 'axios';

const baseUrl = '/api/users';

const create = async (newUser) => {
  const user = await axios.post(baseUrl, newUser);
  return user.data;
};

const userService = {
  create,
};

export default userService;
