//   userId: {
//     type: 'follow',
//     userName: 'XYZ',
//     userId: 'userId',
//     id: 'userId',
//   },

//   commentId: {
//     type: 'comment',
//     userName: 'XYZ',
//     userId: 'userId',
//     commentId: 'commentId',
//     postId: 'postId',
//     desc:"description",
//     id: 'commentId_postId',
//     image:"commentId"
//     commentDesc:"commentDesc"
//   },

//   userId_postId: {
//     type: 'likePost',
//     userName: 'XYZ',
//     userId: 'userId',
//     postId: 'postId',
//     id: 'userId_postId',
//     desc:"description",
//     image:"imageOfPost"
//   },

export const cleanNotification = (notificationData) => {
  return notificationData.map((data) => {
    const { type } = data;
    let id = null;
    switch (type) {
      case 'follow':
        id = data.userId;
        break;
      case 'comment':
        id = `${data.commentId}_${data.postId}`;
        break;
      case 'likePost':
        id = `${data.userId}_${data.postId}`;
        break;
      default:
        id = data.userId;
    }
    return { ...data, id };
  });
};
