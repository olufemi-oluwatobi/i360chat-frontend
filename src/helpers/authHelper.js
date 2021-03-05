export const getAuthToken = () => localStorage.getItem("authToken");

export const storeAuthToken = (token) =>
  localStorage.setItem("authToken", token);

export const parseJwt = (token) => {
  try {
    return JSON.parse(atob(token.split(".")[1]));
  } catch (e) {
    return null;
  }
};

export const refreshAuthToken = async (config) => {
  const { url } = config;
  const refreshUrl = "";
  delete config.url;
  return fetch(refreshUrl, config).then(async (res) => {
    res = await res.json();
    config.Authorization = `${config.Authorization.split(" ")[0]} ${
      res.token
    } `;

    return fetch(url, config);
  });
};
