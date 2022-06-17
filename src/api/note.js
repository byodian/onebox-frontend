import axios from 'axios';
const baseUrl = '/api/notes';

let token = null;

const setToken = newToken => {
  token = `bearer ${newToken}`;
};

const getAll = () => {
  const config = {
    headers: { Authorization: token },
  };
  const request = axios.get(baseUrl, config);
  return request.then(response => response.data);
};

const getNotesByUser = async (username) => {
  const config = {
    headers: { Authorization: token },
  };
  const request = await axios.get(`/api/users/${username}`, config);
  return request.data;
};

const getById = async (id) => {
  const request = await axios.get(`${baseUrl}/${id}`);
  return request.data;
};

const create = (newObject) => {
  const config = {
    headers: { Authorization: token },
  };

  const request = axios.post(baseUrl, newObject, config);
  return request.then(response => response.data);
};

const update = (id, newObject) => {
  const request = axios.put(`${baseUrl}/${id}`, newObject);
  return request.then(response => response.data);
};

const remove = async (id) => {
  const config = {
    headers: {
      Authorization: token
    }
  };

  await axios.delete(`${baseUrl}/${id}`, config);
};

export default { getAll, getById, create, update, setToken, remove, getNotesByUser };
