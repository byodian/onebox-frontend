import Request from '../utils/request';

const baseURL = '/notes';

export function getNotesApi(type) {
  let url;

  switch (type) {
    case 'star':
      url = `${baseURL}/star`;
      break;
    case 'today':
      url = `${baseURL}/today`;
      break;
    default:
      url = `${baseURL}`;
  }

  return Request({
    url,
    method: 'get',
  });
}

export function getSingleNoteApi(id) {
  return Request({
    url: `${baseURL}/${id}`,
  });
}

export function createNoteApi(data) {
  return Request({
    url: baseURL,
    method: 'post',
    data,
  });
}

export function updateSingleNoteApi(id, data) {
  return Request({
    url: `${baseURL}/${id}`,
    method: 'patch',
    data,
  });
}

export function removeSingleNoteApi(id) {
  return Request({
    url: `${baseURL}/${id}`,
    method: 'delete',
  });
}
