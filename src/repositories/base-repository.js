import axios from "axios"

const baseDomain = "http://localhost:8181"
const baseURL = `${baseDomain}/crawler-api`

const defaultOptions = {
  baseURL: baseURL,
  headers: {
    'Content-Type': 'application/json'
  }
}

const instance = axios.create(defaultOptions)

instance.interceptors.request.use(function (config) {
  if (sessionStorage.getItem('crawler-client')) {
    const token = JSON.parse(sessionStorage.getItem('crawler-client')).auth.token;
    config.headers.common.Authorization = token ? 'Bearer ' + token : ''
  }
  return config
})

export default instance
