import axios from 'axios'
const baseUrl = '/api/blogs'

let token = null
let config = null
const setToken = newToken => {
  token = `Bearer ${newToken}`
  token && setConfig(token)
}
const setConfig = token => {
  config = { headers: { Authorization: token } }
}

const getAll = async () => {
  const request = await axios.get(baseUrl, config)
  console.log(123)
  return request.data
}

const create = async (newBlog) => {
  console.log(321)
  const response = await axios.post(baseUrl, newBlog, config)
  return response.data
}

// eslint-disable-next-line import/no-anonymous-default-export
export default { getAll, setToken, create }