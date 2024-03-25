import axios from 'axios'

const baseURL ='https://manage.jaxtina.com/rest/v11_3/'
const apiConfig = axios.create({
  baseURL: baseURL,
  headers: {
     Accept: "application/json",
    "Content-Type": "application/json",
    "Access-Control-Allow-Origin": "*",
  },
  timeout: 10000
})

apiConfig.interceptors.request.use(
  (config: any) => {
    const token = localStorage.getItem("token")
    if (token) {
      config.headers = config.headers ?? {}
      config.headers.Authorization = `Bearer ${token}`
    }
    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)
apiConfig.interceptors.response.use(
  (response: any) => {
    return response
  },
  (error: any) => {
    const { status } = error.response
    if (status === 401) {
      return
    }
    return error.response
  }
)

const apiServices = {
  async post(urlApi: string, params?: any) {
    try {
      const response = await apiConfig
        .post(urlApi, params)
      return response
    } catch (error) {
      return error
    }
  },
  put(urlApi: string, params?: any) {
    return apiConfig
      .put(urlApi, params)
      .then((response) => response)
      .catch((error) => error)
  },
  patch(urlApi: string, params?: any) {
    return apiConfig
      .patch(urlApi, params)
      .then((response) => response)
      .catch((error) => error)
  },
  get(urlApi: string) {
    return apiConfig
      .get(urlApi)
      .then((response) => response)
      .catch((error) => error)
  },
  delete(urlApi: string) {
    return apiConfig
      .delete(urlApi)
      .then((response) => response)
      .catch((error) => error)
  }
}
export default apiServices
