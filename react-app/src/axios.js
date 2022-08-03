import axios from 'axios'

const axiosInstance = axios.create()

export function setAxiosToken(token) {
    // set token in header for every request if token is available in local storage and is not expired
    if (!token) {
        axiosInstance.defaults.headers.common['Authorization'] = null // remove token from header if token is not available in local storage
    }
    axiosInstance.defaults.headers.common['Authorization'] = 'Bearer ' + token //else set token in header for every request if token is available in local storage
}

export function setHeader() {
    axiosInstance.defaults.headers.post['Content-Type'] = 'application/json'
}
export default axiosInstance
