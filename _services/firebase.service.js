import axios from 'axios'
import { API_URL } from '@/_services/config'
import { authHeader } from '@/_helpers'

export const firebaseService = {
  registerTokenToTopic
}

function registerTokenToTopic(token, topic){
  axios.post(`${API_URL}/notification/register`,{token, topic}, { headers: authHeader()})
    .then(r => r).catch(err =>  Promise.reject(err))
}
