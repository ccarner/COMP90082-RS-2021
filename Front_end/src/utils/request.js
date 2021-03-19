import axios from "axios"

const accessTokenKey = "accessToken"

const request = axios.create({
  baseURL: "http://localhost:4000/",
  // baseURL: "http://localhost:4000/",
  timeout: 10000,
  // headers: { "auth-token": accessTokenKey },
})

request.interceptors.request.use((config) => {
  const token = localStorage.getItem(accessTokenKey)
  if (token) {
    // eslint-disable-next-line no-param-reassign
    config.headers.common["auth-token"] = `${token}`
  }
  return config
})

export default request
