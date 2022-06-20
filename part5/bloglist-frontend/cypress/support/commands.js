// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --



// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })

Cypress.Commands.add('login', (user) => {
  cy.request('POST','http://localhost:3003/api/login',user)
    .then ( response => { window.localStorage.setItem('loggedBloglistappUser',JSON.stringify(response.body)) })
  cy.visit('http://localhost:3000') 

})

Cypress.Commands.add('addBlog', (blog) => { 
  const loggedUser=JSON.parse(window.localStorage.getItem('loggedBloglistappUser'))
  const token=loggedUser.token
  cy.request({ 
    method:'POST',
    url:'http://localhost:3003/api/blogs',
    body:blog,
    headers:{ Authorization:'Bearer '+token}
  })
  cy.visit('http://localhost:3000')
})

Cypress.Commands.add('updateBlog', (id,{ title,author,url },likes) => { 
  const loggedUser=JSON.parse(window.localStorage.getItem('loggedBloglistappUser'))
  const token=loggedUser.token

  const baseUrl='http://localhost:3003/api/blogs'
  const vurl=`${baseUrl}/${id}`
  console.log(vurl)
  cy.request({ 
    method:'PUT',
    url:vurl,
    body:{ title, author, url,likes },
    headers:{ Authorization:'Bearer '+token }
  })
  cy.visit('http://localhost:3000')
})