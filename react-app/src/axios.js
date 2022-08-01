import axios from "axios";

const axiosInstance = axios.create();

export function setToken() {
  // set token in header for every request if token is available in local storage and is not expired
  axiosInstance.defaults.headers.common[
    "Authorization"
  ] = `Bearer ${localStorage.getItem("token")}`;
}

export function setHeader() {
  axiosInstance.defaults.headers.post["Content-Type"] = "application/json";
}
export default axiosInstance;
