import axios from 'axios'
const baseUrl = '/api/blogs'

let token = null
let config = null

export const setToken = newToken => {
  token = `Bearer ${newToken}`
  token && setConfig(token)
}

const setConfig = token => {
  config = { headers: { Authorization: token } }
}

export const getAll = async () => {
  const request = await axios.get(baseUrl, config)
  return request.data
}

export const create = async (newBlog) => {
  const response = await axios.post(baseUrl, newBlog, config)
  return response.data
}

export const getAllComments = async (blogId) => {
  const response = await axios.get(`${baseUrl}/${blogId}/comments`, config)
  return response.data
}

export const comment = async (payload) => {
  const response = await axios.post(`${baseUrl}/${payload.blogId}/comments`, payload.content, config)
  return response.data
}

export const update = async (updatedBlog) => {
  const response = await axios.put(`${baseUrl}/${updatedBlog.id}`, updatedBlog, config)
  return response.data
}

export const remove = async (blog) => {
  const response = await axios.delete(`${baseUrl}/${blog.id}`, config)
  console.log(response.data)
  return response.data
}

export default { setToken, getAll, create, update, remove, getAllComments, comment }