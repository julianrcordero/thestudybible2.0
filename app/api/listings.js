import apiClient from "./apiClient";

// const endpoint = "/getdashboard";

const getDevotionals = () => apiClient.get("/getdevotionals");
const getResources = () => apiClient.get("/getdashboard");

// export const addListing = (listing, onUploadProgress) => {
//   const data = new FormData();
//   data.append("title", listing.title);
//   data.append("scripture", listing.scripture);
//   data.append("categoryId", listing.category.value);
//   data.append("description", listing.description);

//   listing.images.forEach((image, index) =>
//     data.append("images", {
//       name: "image" + index,
//       type: "image/jpeg",
//       uri: image,
//     })
//   );

//   if (listing.location)
//     data.append("location", JSON.stringify(listing.location));

//   //Parent > Child

//   return client.post(endpoint, data, {
//     onUploadProgress: (progress) =>
//       onUploadProgress(progress.loaded / progress.total),
//   });
// };

// content-type
// application/json
// multipart/form-data

export default {
  // addListing,
  getDevotionals,
  getResources,
};
