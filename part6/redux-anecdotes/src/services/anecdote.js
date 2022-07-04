import axios from 'axios'
const baseUrl='http://localhost:3001/anecdotes'

const getAll = async()=>{
    const response= await axios.get(baseUrl)
    return response.data
}
const create =async (objAnecdote)=>{
    const response= await axios.post(baseUrl,objAnecdote)
    return response.data
}
const update =async(id,objAnecdote)=>{
    const response= await axios.put(`${baseUrl}/${id}`,objAnecdote)
    return response.data
}
const objAnecdoteService={getAll,create,update}
export default objAnecdoteService