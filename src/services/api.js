import axios from 'axios';

const baseURL = 'https://quiet-falls-59912.herokuapp.com/';

export default api = axios.create({
  baseURL,
});

export const apiGetFetch = (urlComplete, header, data) => {
  return fetch(`${baseURL}${urlComplete}`, {
    method: 'GET',
    body: data,
    headers: header,
  });
};
