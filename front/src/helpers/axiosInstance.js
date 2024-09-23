import axios from "axios";
import store from "../helpers/store";

const axiosInstance = axios.create({
  baseURL: `http://localhost:4000`,
})

axiosInstance.interceptors.request.use(config => {
  // jwt setting here maybe?
  console.log(store.getters.getJwt)
  if (store.getters.getJwt) {
    console.log(store.getters.getJwt)
    config.headers.auth_token = store.getters.getJwt
  }
  // to automatically send the public key on any emitted request using the instance

  return config;
})

axiosInstance.interceptors.response.use(
  response => {
    return response
  }, error => {
    // handle error cases here
    return Promise.reject(error);
  }
)


export default axiosInstance;
