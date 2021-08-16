export const isAuthenticated = function () {
  return !!localStorage.getItem('socialAuthToken');
};
export const getToken = function () {
  return localStorage.getItem('socialAuthToken');
};

export const setToken = function (token) {
  return localStorage.setItem('socialAuthToken', token);
};

export const logout = function () {
  return localStorage.removeItem('socialAuthToken');
};
