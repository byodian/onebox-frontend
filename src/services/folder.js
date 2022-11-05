import Request from '../utils/request';

const baseURL = '/folders';

export function getAllFolders() {
  return Request({
    url: baseURL,
    method: 'get',
  });
}

export function getSingleFolderApi(id) {
  return Request({
    url: `${baseURL}/${id}`,
  });
}

export function createFolderApi(data) {
  return Request({
    url: baseURL,
    method: 'post',
    data,
  });
}

export function updateSingleFolderApi(id, data) {
  return Request({
    url: `${baseURL}/${id}`,
    method: 'patch',
    data,
  });
}

export function removeSingleFolderApi(id) {
  return Request({
    url: `${baseURL}/${id}`,
    method: 'delete',
  });
}
