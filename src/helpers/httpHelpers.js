import { getAuthToken } from "./authHelper";

const buildQueryString = (queryObject) =>
  Object.entries(queryObject)
    .map(([key, value]) => `${key}=${encodeURIComponent(value)}`)
    .join("&");

const getDefaultHttpParams = () => {
  const headers = new Headers({
    "Content-Type": "application/json",
    Authorization: `Bearer ${getAuthToken()}`,
  });
  return { headers, credentials: "same-origin" };
};

const getResponse = (response, config, refreshToken) => {
  if (response.status === 401 && refreshToken)
    return refreshToken(config).then((response) =>
      getResponse(response, config)
    );
  else {
    response
      .json()
      .then((data) => Promise.resolve({ ...data, status: response.status }));
  }
};
export const makePostRequest = (requestURL, requestData) => {
  const params = {
    method: "POST",
    body: JSON.stringify(requestData),
    ...getDefaultHttpParams(),
  };

  return fetch(requestURL, params).then((response) =>
    response
      .json()
      .then((data) => Promise.resolve({ ...data, status: response.status }))
  );
};

export const makeGetRequest = (requestURL, queryData = {}) => {
  const params = {
    method: "GET",
    ...getDefaultHttpParams(),
  };
  const url = `${requestURL}?${buildQueryString(queryData)}`;

  return fetch(url, params).then((response) =>
    response
      .json()
      .then((data) => Promise.resolve({ ...data, status: response.status }))
  );
};
