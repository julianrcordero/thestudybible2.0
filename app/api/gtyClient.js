import { create } from "apisauce";
import cache from "../utility/cache";
import authStorage from "../auth/storage";

const gtyClient = create({
  baseURL: "https://api.gty.org",
});

gtyClient.addAsyncRequestTransform(async (request) => {
  const authToken = await authStorage.getAccessToken();
  if (!authToken) return;
  request.headers["Authorization"] = "Bearer " + authToken;
});

const get = gtyClient.get;
gtyClient.get = async (url, params, axiosConfig) => {
  // Before
  const response = await get(url, params, axiosConfig);
  // After

  if (response.ok) {
    cache.store(url, response.data);
    return response;
  }

  const data = await cache.get(url);
  return data ? { ok: true, data } : response;
};

export default gtyClient;
