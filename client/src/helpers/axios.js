import axios from 'axios';
import { getToken } from './auth';

const axiosClient = axios.create();

axiosClient.defaults.headers = {
  'Content-Type': 'application/json',
  Accept: 'application/json',
};

//All request will wait 2 seconds before timeout
axiosClient.defaults.timeout = 2000;

axiosClient.defaults.withCredentials = true;

axios.interceptors.request.use(
  function (request) {
    request.headers['Content-Type'] = 'multipart/form-data';
    request.headers['Authorization'] = getToken();
    return request;
  },
  null,
  { synchronous: true }
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
