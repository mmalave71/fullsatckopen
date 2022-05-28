const Blog = require('../models/blog')
const User =require('../models/user')


const initialBlogs=[ 
    {"title":"PasteldeChucho","author":"Ruben Santiago","url":"http://pasteldechucho.blogspot.com","likes":5},
    {"title":"El placer de la lectura","author":"Connie Zurita","url":"http://elplacerdelalectura.com/blog","likes":15}
]

const blogsInDb=async ()=>{
    const blogs=await Blog.find({})
    return blogs.map(blog => blog.toJSON())
}

const usersInDb = async ()=>{
    const users= await User.find({})
    return users.map(user => user.toJSON())
}

module.exports={initialBlogs,blogsInDb,usersInDb}