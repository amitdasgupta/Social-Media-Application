import {
  deleteRequest,
  getRequest,
  postRequest,
  patchRequest,
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
