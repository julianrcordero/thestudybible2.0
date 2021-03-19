import apiClient from "./apiClient";

const endpoint = "/dashboard";

const getDashboard = () => {
  Object.values(apiClient.get(endpoint));
};

export const addDashboardItem = (dashboardItem, onUploadProgress) => {
  const data = new FormData();
  data.append("title", dashboardItem.title);
  data.append("scripture", dashboardItem.scripture);
  data.append("transcript", dashboardItem.transcript);
  data.append("studyGuideChapter", dashboardItem.studyGuideChapter);
  data.append("imageUrl", dashboardItem.imageUrl);
  data.append("itemDate", dashboardItem.itemDate);
  data.append("category", dashboardItem.category);

  //Parent > Child

  return apiClient.post(endpoint, data, {
    onUploadProgress: (progress) =>
      onUploadProgress(progress.loaded / progress.total),
  });
};

// content-type
// application/json
// multipart/form-data

export default {
  addDashboardItem,
  getDashboard,
};
