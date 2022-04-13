import { deleteRequest, postRequest, getRequest } from '../helpers/axios';

export async function saveNotification(notificationData) {
  const result = await postRequest('notification', notificationData);
  return result;
}

export async function deleteNotification(postData) {
  const { _id } = postData;
  const result = await deleteRequest(`notification/${_id}`);
  return result;
}

export async function fetchTimeLinePosts(metaData) {
  const result = await getRequest(
    `notification/timelinePosts/all?pageNo=${metaData.pageNo}&size=${metaData.size}`
  );
  return result;
}
