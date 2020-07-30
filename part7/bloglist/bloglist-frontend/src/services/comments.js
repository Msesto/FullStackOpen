import axios from 'axios'

const getAll = async (id) => {
  const response = await axios.get(`/api/blogs/${id}/comments`)
  return response.data
}

const create = async (newObject, id) => {
  const response = await axios.post(`/api/blogs/${id}/comments`, newObject)
  return response.data
}

export default { getAll, create }