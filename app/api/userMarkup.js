import gtyClient from "./gtyClient";

const prefix = "/api/values";

const getUserMarkup = (username) =>
  gtyClient.get(prefix + "/GetUserInfoByUsername/" + username);

const addUserMarkup = (
  markup,
  username,
  type
  // onUploadProgress
) => {
  //Parent > Child

  return gtyClient.post(
    prefix + "/InsertObjectByUsernameType/" + username + "/" + type,
    markup
    // {
    //   onUploadProgress: (progress) =>
    //     onUploadProgress(progress.loaded / progress.total),
    // }
  );
};

const editUserMarkup = (
  markup,
  username,
  type
  // onUploadProgress
) => {
  //Parent > Child

  return gtyClient.put(
    prefix + "/UpdateObjectByUsernameType/" + username + "/" + type,
    markup
    // {
    //   onUploadProgress: (progress) =>
    //     onUploadProgress(progress.loaded / progress.total),
    // }
  );
};

const deleteUserMarkup = (
  id,
  username,
  type
  // onUploadProgress
) => {
  //Parent > Child

  return gtyClient.delete(
    prefix + "/DeleteObjectByUsernameTypeId/" + username + "/" + type + "/" + id
    // {
    //   onUploadProgress: (progress) =>
    //     onUploadProgress(progress.loaded / progress.total),
    // }
  );
};

// content-type
// application/json
// multipart/form-data

export default {
  addUserMarkup,
  deleteUserMarkup,
  editUserMarkup,
  getUserMarkup,
};
