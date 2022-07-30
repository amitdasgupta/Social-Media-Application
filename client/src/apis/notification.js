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

export async function fetchAllNotifications(
  metaData = { pageNo: 1, size: 25 }
) {
  const result = await getRequest(
    `notification/all?pageNo=${metaData.pageNo}&size=${metaData.size}`
  );
  return result;
}
