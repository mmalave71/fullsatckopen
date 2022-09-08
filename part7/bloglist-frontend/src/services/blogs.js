import axios from 'axios'
const baseUrl = 'http://localhost:3003/api/blogs'

let token =null

const setToken =(tokenOfUser) => {
  token = tokenOfUser
}

const getAll = () => {
  const request = axios.get(baseUrl)
  return request.then(response => response.data)
}
const getBlog = async (id) => {
  const response =  await axios.get(`${baseUrl}/${id}`)
  return  response.data
}
const create = async ( objBlog ) => {
  const options={ headers:{ authorization:'Bearer '+ token } }
  const result = await axios.post(baseUrl, objBlog, options)
  return result.data
}

const update = async (id,objblogtoUpdate) => {
  const options={ headers:{ authorization:'Bearer '+ token } }
  const result = await axios.put(`${baseUrl}/${id}`,objblogtoUpdate,options)
  return result.data
}
const deleteBlog = async (id) => {
  const options={ headers:{ authorization:'Bearer '+ token } }
  const result= await axios.delete(`${baseUrl}/${id}`,options)
  return result.status
}

const addComment = async (id,comment) => {
  const objComment={ comment }
  const result = await axios.post(`${baseUrl}/${id}/comments`, objComment)
  return result.data

}
const objBlogService = { getAll, setToken ,create,update,deleteBlog,getBlog,addComment }
export default objBlogService