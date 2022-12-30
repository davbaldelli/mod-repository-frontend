import axios from 'axios'
import { authHeader } from '@/_helpers'
import { API_URL } from '@/_services/config'

axios.interceptors.response.use((response) => {
  return response
}, function (error) {
  return Promise.reject(error)
})

export const serverService = {
  getCarSkins,
  addSkin,
}

function getCarSkins(carId){
  return axios
    .get(`${API_URL}/skin`, {headers : authHeader(), params : {carId}})
    .then(response => response.data)
    .catch((error) => Promise.reject(error.response ? error.response : error))
}

function addSkin(skin){
  return axios
    .post(`${API_URL}/skin/add`, skin, { headers: authHeader() })
    .then(res => res.data)
    .catch(error => Promise.reject(error.response ? error.response : error))
}
