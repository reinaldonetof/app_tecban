export const apiPostFetch = (urlComplete, header, data) => {
  return fetch(`${baseURL}${urlComplete}`, {
    method: "POST",
    body: data,
    headers: header,
  });
};

export const apiGetFetch = (urlComplete, header, data) => {
  return fetch(`${urlComplete}`, {
    method: "GET",
    body: data,
    headers: header,
  });
};
