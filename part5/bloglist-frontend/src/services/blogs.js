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
  return request.data
}

const create = async (newBlog) => {
  const response = await axios.post(baseUrl, newBlog, config)
  return response.data
}

const update = async (updatedBlog) => {
  const response = await axios.put(`${baseUrl}/${updatedBlog.id}`, updatedBlog, config)
  return response.data
}

const remove = async (blog) => {
  const response = await axios.delete(`${baseUrl}/${blog.id}`, config)
  return response.data
}

// eslint-disable-next-line import/no-anonymous-default-export
export default { setToken, getAll, create ,update, remove}