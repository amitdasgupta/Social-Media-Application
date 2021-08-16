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
