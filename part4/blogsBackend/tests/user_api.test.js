const supertest=require('supertest')
const app=require('../app')
const api=supertest(app)
const mongoose=require('mongoose')
const User=require('../models/user')
const bcrypt=require('bcryptjs') 
const helper=require('./helper_test')


beforeEach(async() => {
    
    const password='salainen'
    const passwordHash = await bcrypt.hash(password,10)
    const initialUser ={ username:'root',name:'superuser',passwordHash}

    await User.deleteMany({})

    const user = new User(initialUser)
    await user.save()

})

test('testing a get users',async () => {

        await api
              .get('/api/users')
              .expect(200)
              .expect('Content-Type',/application\/json/)
})

test('user with username novalid is not added', async ()=>{ 

    const userAtStart=await helper.usersInDb()

    const newuser={ username:'Al', name:'Al Bondy',password:'salainen'}
    
    const result= await api
                    .post('/api/users')
                    .send(newuser)
                    .expect(400)

     const userAtEnd=await helper.usersInDb()

     expect(userAtStart).toHaveLength(userAtEnd.length)
     expect(result.body.error).toContain('`username` (`Al`) is shorter than the minimum allowed length (3)')

})

test('user with password novalid is not added', async ()=>{ 

    const userAtStart=await helper.usersInDb()

    const newuser={ username:'AlBondy', name:'Al Bondy',password:'sa'}
    
    const result= await api
                    .post('/api/users')
                    .send(newuser)
                    .expect(400)

   
     const userAtEnd=await helper.usersInDb()

     expect(userAtStart).toHaveLength(userAtEnd.length)
     expect(result.body.error).toContain('password is shorter than the minimum allowed length (3)')

})


test('creation fails with proper statuscode and message if username already taken',async () => {

    const newUser={ username:'root',name:'new superuser',password:'newroot'}

    const userAtStart=await helper.usersInDb()

    const result= await api
                        .post('/api/users')
                        .send(newUser)
                        .expect(400)
    const userAtEnd=await helper.usersInDb()

    expect(userAtEnd).toHaveLength(userAtStart.length)
    expect(result.body.error).toContain('`username` to be unique')

})

afterAll( () => {
    mongoose.connection.close()
})
