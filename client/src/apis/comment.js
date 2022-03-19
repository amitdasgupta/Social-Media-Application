import {
  deleteRequest,
  getRequest,
  postRequest,
  putRequest,
} from '../helpers/axios';

export async function createComment(postData) {
  const { postId, ...restData } = postData;
  const result = await postRequest(`comment/${postId}`, restData);
  return result;
}

export async function updateComment(postData) {
  const { _id } = postData;
  const result = await putRequest(`post/${_id}`);
  return result;
}

export async function fetchPostComments(metaData) {
  const result = await getRequest(
    `comment/${metaData.postId}/getAllComments?pageNo=${metaData.pageNo}&size=${metaData.size}`
  );
  return result;
}

export async function deleteComment(id) {
  const result = await deleteRequest(`post/${id}`);
  return result;
}

export async function likeComment(id) {
  const result = await putRequest(`post/${id}/like`);
  return result;
}

export async function unlikeComment(id) {
  const result = await putRequest(`post/${id}/unlike`);
  return result;
}

export async function getComment(id) {
  const result = await getRequest(`post/${id}`);
  return result;
}
