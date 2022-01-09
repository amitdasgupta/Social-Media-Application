import {
  deleteRequest,
  getRequest,
  postRequest,
  patchRequest,
  putRequest,
} from '../helpers/axios';

export async function loginUser(loginData) {
  const { email, password } = loginData;
  const result = await postRequest('auth/login', {
    email,
    password,
  });
  return result;
}

export async function getAuthUserData(loginData) {
  const result = await getRequest('user');
  return result;
}

export async function getAllUserData() {
  const result = await getRequest('user/validusers/all');
  return result;
}

export async function followUser(id) {
  const result = await putRequest(`user/${id}/follow`);
  return result;
}

export async function unFollowUser(id) {
  const result = await putRequest(`user/${id}/unfollow`);
  return result;
}
