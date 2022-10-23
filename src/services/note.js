import axios from 'axios';

const baseUrl = '/notes';

let token = null;

const setToken = (newToken) => {
  token = newToken;
};

const getAll = async () => {
  const config = {
    headers: { 'x-access-token': token },
  };
  const response = await axios.get(baseUrl, config);
  return response.data;
};

const getNotes = async (type) => {
  let url;

  if (type === 'star') {
    url = `${baseUrl}/star`;
  } else if (type === 'today') {
    url = `${baseUrl}/today`;
  } else {
    url = baseUrl;
  }

  const config = {
    headers: { 'x-access-token': token },
  };

  const request = await axios.get(url, config);
  return request.data;
};

const getById = async (id) => {
  const config = {
    headers: { 'x-access-token': token },
  };

  const request = await axios.get(`${baseUrl}/${id}`, config);
  return request.data;
};

const create = async (newObject) => {
  const config = {
    headers: { 'x-access-token': token },
  };

  const response = await axios.post(baseUrl, newObject, config);
  return response.data;
};

const update = async (id, newObject) => {
  const config = {
    headers: { 'x-access-token': token },
  };

  const response = await axios.put(`${baseUrl}/${id}`, newObject, config);

  return response.data;
};

const remove = async (id) => {
  const config = {
    headers: {
      'x-access-token': token,
    },
  };

  await axios.delete(`${baseUrl}/${id}`, config);
};

export const noteService = {
  getAll, getById, create, update, setToken, remove, getNotes,
};

const getAllFolders = async () => {
  const config = {
    headers: { 'x-access-token': token },
  };

  const response = await axios.get('/folders', config);
  return response.data;
};

const createFolder = async (newObject) => {
  const config = {
    headers: { 'x-access-token': token },
  };

  const response = await axios.post('/folders', newObject, config);
  return response.data;
};

const findOneFolder = async (id) => {
  const config = {
    headers: { 'x-access-token': token },
  };

  const response = await axios.get(`/folders/${id}`, config);
  return response.data;
};

export const folderService = { getAllFolders, createFolder, findOneFolder };
