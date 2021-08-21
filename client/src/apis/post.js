import {
  deleteRequest,
  getRequest,
  postRequest,
  patchRequest,
} from '../helpers/axios';

export async function createPost(postData) {
  const result = await postRequest('post', postData);
  return result;
}

export async function updatePost(postData) {
  const result = await getRequest('post');
  return result;
}
