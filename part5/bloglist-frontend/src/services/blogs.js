import axios from 'axios'
//const baseUrl = '/api/blogs' //produccion
const baseUrl = 'http://localhost:3003/api/blogs'

let token =null

const setToken =(tokenOfUser) => {
  token = tokenOfUser
  console.log('token en setToken',token)
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
  //console.log('Token en create=',token,'options=',options)
  const result = await axios.post(baseUrl, objBlog, options)
  return result.data
}

const update = async (id,objblogtoUpdate) => {
  const options={ headers:{ authorization:'Bearer '+ token } }
  console.log(`${baseUrl}/${id}`)
  const result = await axios.put(`${baseUrl}/${id}`,objblogtoUpdate,options)
  return result.data
}
const deleteBlog = async (id) => {
  const options={ headers:{ authorization:'Bearer '+ token } }
  const result= await axios.delete(`${baseUrl}/${id}`,options)
  return result.status
}

const objBlogService = { getAll, setToken ,create,update,deleteBlog,getBlog }
export default objBlogService