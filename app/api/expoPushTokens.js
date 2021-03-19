import apiClient from "./apiClient";

const register = (pushToken) =>
  apiClient.post("/expoPushTokens", { token: pushToken });

export default {
  register,
};
