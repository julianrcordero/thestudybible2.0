import { create } from "apisauce";
import cache from "../utility/cache";
import authStorage from "../auth/storage";

const apiClient = create({
  baseURL: "https://apibeta.gty.org/api/values",
});

apiClient.addAsyncRequestTransform(async (request) => {
  const authToken = await authStorage.getAccessToken();
  if (!authToken) return;
  request.headers["x-auth-token"] = authToken;
});

const get = apiClient.get;
apiClient.get = async (url, params, axiosConfig) => {
  // Before
  const response = await get(url, params, axiosConfig);
  // After

  if (response.ok) {
    // console.log("storing this: ", url);
    cache.store(url, response.data);

    return response;
  }

  // console.log("retrieving this: ", url);
  const obj = await cache.get(url);
  const data = Object.values(obj);
  return data ? { ok: true, data } : response;
};

export default apiClient;
