import axios from 'axios';
import { getToken, logout } from './auth';
const axiosClient = axios.create();

axiosClient.defaults.headers = {
  'Content-Type': 'multipart/form-data',
  Accept: 'application/json',
};

//All request will wait 2 seconds before timeout
axiosClient.defaults.timeout = 20000 * 60;

axiosClient.defaults.withCredentials = true;

axiosClient.interceptors.request.use(
  function (request) {
    if (request.data) {
      const data = request.data;
      const formData = new FormData();
      Object.keys(data).forEach((name) => {
        formData.append(name, data[name]);
      });
      request.data = formData;
    }
    request.headers['Content-Type'] = 'multipart/form-data';
    request.headers['Authorization'] = `Bearer ${getToken()}`;

    return request;
  },
  null,
  { synchronous: true }
);

axiosClient.interceptors.response.use(
  (response) => {
    return response;
  },
  async function (result) {
    const { response: { data = '' } = {} } = result;
    if (data === 'jwt expired') {
      return logout();
    }
    console.log(result.response);
    return Promise.reject(result);
  }
);

export function getRequest(URL) {
  return axiosClient.get(`/${URL}`).then((response) => response);
}

export function postRequest(URL, payload) {
  return axiosClient.post(`/${URL}`, payload).then((response) => response);
}

export function patchRequest(URL, payload) {
  return axiosClient.patch(`/${URL}`, payload).then((response) => response);
}

export function deleteRequest(URL) {
  return axiosClient.delete(`/${URL}`).then((response) => response);
}

export function putRequest(URL, payload) {
  return axiosClient.put(`/${URL}`, payload).then((response) => response);
}
