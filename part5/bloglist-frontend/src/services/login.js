import axios from 'axios'
const baseUrl='http://localhost:3003/api/login'

const login = async (credentias) => {
  const result= await axios.post(baseUrl,credentias)
  return result.data
}

export default { login }