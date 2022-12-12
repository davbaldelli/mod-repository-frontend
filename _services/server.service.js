import axios from 'axios'
import { authHeader } from '@/_helpers'
import { API_URL } from '@/_services/config'

axios.interceptors.response.use((response) => {
  return response
}, function (error) {
  return Promise.reject(error)
})

export const serverService = {
  getAll,
  addServer,
  updateServer
}

function getAll(){
  return axios
    .get(`${API_URL}/fsr/server/all`, {headers : authHeader()})
    .then(response => response.data)
    .catch((error) => Promise.reject(error.response ? error.response : error))
}

function addServer(server){
  return axios
    .post(`${API_URL}/fsr/server/add`, server, {headers : authHeader()})
    .then(response => response.data)
    .catch((error) => Promise.reject(error.response ? error.response : error))
}

function updateServer(server){
  return axios
    .post(`${API_URL}/fsr/server/update`, server, {headers : authHeader()})
    .then(response => response.data)
    .catch((error) => Promise.reject(error.response ? error.response : error))
}
