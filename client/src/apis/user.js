import { getRequest, postRequest, putRequest } from '../helpers/axios';

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

export async function getAllUserData(metaData) {
  const result = await getRequest(
    `user/validusers/all?pageNo=${metaData.pageNo}&size=${metaData.size}`
  );
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

export async function getUserData(userId) {
  const result = await getRequest(`user/validusers/${userId}`);
  return result;
}

export async function updateUser(userData) {
  const { id, ...restData } = userData;
  const result = await putRequest(`user/${id}`, restData);
  return result;
}
