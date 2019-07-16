import axios from "axios"

const baseDomain = "http://localhost:8181"
const baseURL = `${baseDomain}/crawler-api`

const defaultOptions = {
  baseURL: baseURL,
  headers: {
    'Content-Type': 'application/json'
  }
}

let instance = axios.create(defaultOptions)

instance.interceptors.request.use(function (config) {
  const token = localStorage.getItem('user-token')
  config.headers.common.Authorization = token ? token : ''
  return config
})

export default instance
