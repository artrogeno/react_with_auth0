import axios from 'axios'

const instance = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
})

// Alter defaults after instance has been created
// instance.defaults.headers.common['Authorization'] = AUTH_TOKEN;

export default instance
