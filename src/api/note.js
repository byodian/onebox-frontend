import axios from 'axios';

const baseUrl = '/api/notes';

let token = null;

const setToken = (newToken) => {
  token = `bearer ${newToken}`;
};

const getAll = async () => {
  const config = {
    headers: { Authorization: token },
  };
  const response = await axios.get(baseUrl, config);
  return response.data;
};

const getNotesByUser = async (username) => {
  const config = {
    headers: { Authorization: token },
  };
  const request = await axios.get(`/api/users/${username}`, config);
  return request.data;
};

const getById = async (id) => {
  const config = {
    headers: { Authorization: token },
  };

  const request = await axios.get(`${baseUrl}/${id}`, config);
  return request.data;
};

const create = async (newObject) => {
  const config = {
    headers: { Authorization: token },
  };

  const response = await axios.post(baseUrl, newObject, config);
  return response.data;
};

const update = async (id, newObject) => {
  const config = {
    headers: { Authorization: token },
  };

  const response = await axios.put(`${baseUrl}/${id}`, newObject, config);

  return response.data;
};

const remove = async (id) => {
  const config = {
    headers: {
      Authorization: token,
    },
  };

  await axios.delete(`${baseUrl}/${id}`, config);
};

const NoteService = {
  getAll, getById, create, update, setToken, remove, getNotesByUser,
};

export default NoteService;
