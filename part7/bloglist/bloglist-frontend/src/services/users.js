import axios from 'axios'
const baseUrl = '/api/users'

// let token = null

// const setToken = (newToken) => {
//   token = `bearer ${newToken}`
// }

const getAll = () => {
  const request = axios.get(baseUrl)
  return request.then(response => response.data)
}

// const create = async newObject => {
//   const config = {
//     headers: { Authorization: token },
//   }

//   const response = await axios.post(baseUrl, newObject, config)
//   return response.data
// }

// const update = async (newObject, id) => {
//   const config = {
//     headers: { Authorization: token }
//   }
//   const idUrl = baseUrl + `/${id}`
//   const response = await axios.put(idUrl, newObject, config)
//   return response.data
// }

// const deletion = async (id) => {
//   const config = {
//     headers: { Authorization: token }
//   }
//   const idUrl = baseUrl + `/${id}`
//   const response = await axios.delete(idUrl, config)
//   return response.data
// }




export default { getAll }