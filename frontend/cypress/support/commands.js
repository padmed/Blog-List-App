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

Cypress.Commands.add('loginUser', ({ username, password }) => {
  cy.request('POST',`${Cypress.env('BACKEND')}/api/login`, { username, password }).then((token) => {
    window.localStorage.setItem('loggedUser', JSON.stringify(token.body))
    cy.log(window.localStorage.getItem('loggedUser'))
    cy.visit('')
  })
})

Cypress.Commands.add('createBlog', ({ title, author, url }) => {
  const token = 'bearer ' + JSON.parse(window.localStorage.getItem('loggedUser')).token

  cy.request({
    method: 'POST',
    url: `${Cypress.env('BACKEND')}/api/blogs`,
    body: { title, author, url },
    headers: {
      Authorization: token
    }
  })
  cy.visit('')
})

Cypress.Commands.add('addNewUser', ({ name, username, password }) => {
  cy.request('POST', `${Cypress.env('BACKEND')}/api/users`, { name, username, password })
})