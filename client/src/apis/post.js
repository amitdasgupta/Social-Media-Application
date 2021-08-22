import {
  deleteRequest,
  getRequest,
  postRequest,
  putRequest,
} from '../helpers/axios';

export async function createPost(postData) {
  const result = await postRequest('post', postData);
  return result;
}

export async function updatePost(postData) {
  const { _id } = postData;
  const result = await putRequest(`post/${_id}`);
  return result;
}

export async function fetchTimeLinePosts() {
  const result = await getRequest('post/timelinePosts/all');
  return result;
}

export async function deletePost(id) {
  const result = await deleteRequest(`post/${id}`);
  return result;
}

export async function likePost(id) {
  const result = await putRequest(`post/${id}/like`);
  return result;
}

export async function unlikePost(id) {
  const result = await putRequest(`post/${id}/like`);
  return result;
}

export async function getPost(id) {
  const result = await getRequest(`post/${id}`);
  return result;
}
