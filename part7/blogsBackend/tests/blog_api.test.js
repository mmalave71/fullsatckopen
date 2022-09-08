const mongoose  = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const api=supertest(app)
const helper=require('./helper_test')
const Blog =require('../models/blog')
const User = require('../models/user')

const bcrypt=require('bcryptjs')

let token=null

const createUsers = async ()=>{

      let password='salainen'
      let passwordHash = await bcrypt.hash(password,10)
      let initialUser ={ username:'root',name:'superuser',passwordHash}
  
      await User.deleteMany({})
  
      let user = new User(initialUser)
      await user.save()

      //Create other initial user 
       password='hellas'
       passwordHash = await bcrypt.hash(password,10)
       initialUser ={ username:'ahellas',name:'Arton Hellas',passwordHash}
       user = new User(initialUser)
       await user.save()
}
const getToken= async()=>{

      const user ={ username:'root',password:'salainen' }

      const result= await api
                    .post('/api/login')
                    .send(user)
       
      token=result.body.token
}


beforeEach( async()=>{

      await createUsers()
      const usersStored= await helper.usersInDb()
      await Blog.deleteMany({})

      for (let initialBlog of helper.initialBlogs)
      {
            const initialBlogWithUser={...initialBlog, user:usersStored[0].id}
            const blog=new Blog(initialBlogWithUser)
            await blog.save()
      }
      const blogsStored = await helper.blogsInDb()
      await getToken()
      
})

test('testing api_blogs',async ()=>{

      const blogsStored = await helper.blogsInDb()

       const response= await api
                        .get('/api/blogs')
                        .expect(200)
                        .expect('Content-Type',/application\/json/)
      
       expect(response.body).toHaveLength(blogsStored.length)                 
})

test('testing  add  a blog',async()=>{

      const objBlog={ title:"El poder esta en ti",author:"Connie Mendez",url:"http://elpoderestaentu.com/blog",likes:25}
      await api
      .post('/api/blogs')
      .set('Authorization', 'Bearer '+ token)
      .send(objBlog)
      .expect(201)
      .expect('Content-Type',/application\/json/)
      
      const blogsStored= await helper.blogsInDb()
      expect(blogsStored).toHaveLength(helper.initialBlogs.length+1)
      
      const titles=blogsStored.map(b=>b.title)
      expect(titles).toContain(objBlog.title)
})

test('blog without likes is added with likes equal to zero',async()=>{
      const objBlog={ title:"El poder esta en ti",author:"Connie Mendez",url:"http://elpoderestaenti.com/blog"}
      const response=await api
                        .post('/api/blogs')
                        .set('Authorization', 'Bearer '+ token)
                        .send(objBlog)
                        .expect(201)

      const blogAdded=response.body                        
     
      const blogsStored= await helper.blogsInDb()
      expect(blogsStored).toHaveLength(helper.initialBlogs.length+1)
      
      const titles=blogsStored.map(b=>b.title)
      expect(titles).toContain(objBlog.title)
      expect(blogAdded).toHaveProperty('likes',0)
})

test('deleting a blog',async()=>{
      const blogsBefore=await helper.blogsInDb()
      const blogtoDelete=blogsBefore[0]
  
      await api   
            .delete(`/api/blogs/${blogtoDelete.id}`)
            .set('Authorization', 'Bearer '+ token)
            .expect(204)

      const blogsAfter=await helper.blogsInDb()
      expect(blogsAfter).toHaveLength(helper.initialBlogs.length-1)
      const titles=blogsAfter.map(b=>b.title)
      expect(titles).not.toContain(blogtoDelete.title)

})
test('testing the id property',async()=>{


      const response = await api.get('/api/blogs')
      const blog= response.body[0]
      expect(blog.id).toBeDefined()   

})

test('blog without title is not added',async()=>{
      const objBlog={ author:"Connie Mendez" ,url:"http://elpoderestaenti.com/blog", likes:5}

      const response=await api
                        .post('/api/blogs')
                        .set('Authorization', 'Bearer '+ token)
                        .send(objBlog)
                        .expect(400)

      const blogsStored= await helper.blogsInDb()
      
      expect(blogsStored).toHaveLength(helper.initialBlogs.length)
})

test('blog without url is not added',async()=>{
      const objBlog={ title:"El poder esta en ti",author:"Connie Mendez" , likes:5}

      await api
            .post('/api/blogs')
            .set('Authorization', 'Bearer '+ token)
            .send(objBlog)
            .expect(400)

      const blogsStored= await helper.blogsInDb()
      expect(blogsStored).toHaveLength(helper.initialBlogs.length)
})

test('Blog with token is not added',async () => {

      const objBlog={ title:"El poder esta en ti",author:"Connie Mendez",url:"http://elpoderestaenti.com/blog",likes:25}
     
      await api
            .post('/api/blogs')
            .send(objBlog)
            .expect(401)

      const blogsStored = await helper.blogsInDb()

      const titles= blogsStored.map(b=>b.title)
      expect(blogsStored).toHaveLength(helper.initialBlogs.length)
      expect(titles).not.toContain(objBlog.title)
      
})

afterAll( ()=>{
        mongoose.connection.close()    
})