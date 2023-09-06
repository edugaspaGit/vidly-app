import axios from "axios";
import logger from "./logService";
// import auth from "./authService";
import { toast } from "react-toastify";

// axios.defaults.headers.common["x-auth-token"] = auth.getJwt();
// axios.defaults.headers.common["x-auth-token"] = localStorage.getItem("token");

axios.interceptors.response.use(null, (error) => {
  const expectedError =
    error.response &&
    error.response.status >= 400 &&
    error.response.status < 500;
  if (!expectedError) {
    logger.log(error);
    // console.log("Logging the error", error);
    toast.error("An unexpected error ocurred.");
  }
  return Promise.reject(error);
});

function setJwt(jwt) {
  axios.defaults.headers.common["x-auth-token"] = jwt;
}

export default {
  get: axios.get,
  post: axios.post,
  put: axios.put,
  delete: axios.delete,
  setJwt
};
