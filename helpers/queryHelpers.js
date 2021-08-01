/* eslint-disable no-underscore-dangle */
module.exports = {
  doesObjectIdExistInList: (list, id) => {
    const doesKeyExistInList =
      list && list.some((listUserId) => String(listUserId) === String(id));
    return doesKeyExistInList;
  },
  compareObjectIdsKeys: (obj1, obj2) =>
    String(obj1.id || obj1._id) === String(obj2.id || obj2._id),
};
