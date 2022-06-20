

describe('Blog app',function() {
  beforeEach( function(){

    const user = { username:'root', name:'user root', password:'salainen' }
    cy.request('POST','http://localhost:3003/api/testing/reset')
    cy.request('POST','http://localhost:3003/api/users',user)

    cy.visit('http://localhost:3000')
  })

  it('login form', function() {
    cy.contains('blogs')
    cy.contains('Log into application')
  })

  describe('Login', function(){

    it('succeeds with correct credetials', function(){
      cy.get('#username').type('root')
      cy.get('#password').type('salainen')
      cy.get('#login-button').click()
      cy.contains('user root logged in')
      cy.wait(2000)
    })
    it('fails with wrong credentials',function(){
      cy.get('#username').type('root')
      cy.get('#password').type('secret')
      cy.get('#login-button').click()

      cy.get('.error')
        .should('contain','wrong credentials')
        .and('have.css', 'color', 'rgb(255, 0, 0)')

    })
  })

  describe('When logged in', function() {
    beforeEach(function() {

      const user={ username:'root',  password:'salainen' }
      cy.login(user)
    })

    it('A blog can be created', function() {
      cy.contains('new note').click()
      cy.get('#title').type('Pastel de chucho')
      cy.get('#author').type('Ruben Santiago')
      cy.get('#url').type('http:///pasteldechucho.blogsopot.com')
      cy.contains('create').click()
      cy.get('.bloglist').contains('Pastel de chucho')
    })

    it('when a user likes a blog', function(){

      //crearemos un blog

      cy.addBlog({ title:'blog1',author:'autor1',url:'http://blog1.blogspot.com'})
      cy.addBlog({ title:'blog2',author:'autor2',url:'http://blog2.blogspot.com'})
      cy.addBlog({ title:'blog3',author:'autor3',url:'http://blog3.blogspot.com'})
      cy.addBlog({ title:'blog4',author:'autor4',url:'http://blog4.blogspot.com'})
      cy.addBlog({ title:'blog5',author:'autor5',url:'http://blog5.blogspot.com'})
      cy.get('.bloglist').contains('blog3').contains('view').click()
      cy.get('.bloglist').contains('blog3').contains('like').click()

    })

    describe('create and delete blogs',function(){
      beforeEach(function(){
        //add a Secod user
        const user2 = { username:'mmalave', name:'Miguel Malave', password:'secret' }
        cy.request('POST','http://localhost:3003/api/users',user2)
        cy.visit('http://localhost:3000')

      })

      it('when a user creates a blog and then delete it',function(){
        cy.addBlog({title:'blog1',author:'autor1',url:'http://blog1.blogspot.com'})
        cy.addBlog({title:'blog2',author:'autor2',url:'http://blog2.blogspot.com'})
        cy.wait(2000)
        cy.get('.bloglist').contains('blog1').contains('view').click()
        cy.wait(2000)
        cy.get('.bloglist').contains('blog1').contains('remove').click()
        cy.get('.bloglist').should('not.contain','blog1')
      })
      it('when a user creates a blog another cannot delete it',function(){
        //blogs creates by user root  
        cy.addBlog({title:'blog1',author:'autor1',url:'http://blog1.blogspot.com'})
        cy.addBlog({title:'blog2',author:'autor2',url:'http://blog2.blogspot.com'})
        cy.contains('Logout').click()
        //blog2 create2 by user mmalave
        const user2={ username:'mmalave',  password:'secret' }
        cy.login(user2)
        cy.addBlog({title:'blog3',author:'autor3',url:'http://blog3.blogspot.com'})
        cy.addBlog({title:'blog4',author:'autor4',url:'http://blog4.blogspot.com'})
        //user mmalave don't delete a blog 1 create by user root
        cy.get('.bloglist').contains('blog1').contains('view').click()
        cy.get('.bloglist')
          .should('contain','blog1')
          .should('not.contain','remove')

      })
    }) //  describe('blogs adds by diferents users',function(){

    describe('ordered blog list',function(){
      beforeEach(function(){
        cy.addBlog({title:'blog1',author:'autor1',url:'http://blog1.blogspot.com'})
        cy.addBlog({title:'blog2',author:'autor2',url:'http://blog2.blogspot.com'}) 
        cy.addBlog({title:'blog3',author:'autor3',url:'http://blog3.blogspot.com'})
        cy.addBlog({title:'blog4',author:'autor4',url:'http://blog4.blogspot.com'}) 
      })
      it('verify that blog list is sorted by likes',function(){
        let i=5
        cy.request('GET','http://localhost:3003/api/blogs')
          .then ( response =>{ response.body.map(b => {
            cy.updateBlog(b.id,b,i)
            i=i+5
          })

          //blog4 must be First  <=> nth-of-type(2)'
          //blog1 must be 4Th   <=> th-of-type(5)'

          cy.get('.bloglist:nth-of-type(2)').contains('blog4')
          cy.get('.bloglist:nth-of-type(3)').contains('blog3')
          cy.get('.bloglist:nth-of-type(4)').contains('blog2')
          cy.get('.bloglist:nth-of-type(5)').contains('blog1')
          })


      })

    })


  })

})