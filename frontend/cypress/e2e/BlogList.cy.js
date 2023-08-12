
describe('BlogList', function () {
  beforeEach(function(){
    cy.request('POST', 'http://localhost:3003/api/testing/reset')
    
    const newUser = {
      name: 'tester',
      username: 'test',
      password: 'test'
    }
    cy.request('POST', 'http://localhost:3003/api/users', newUser)

    cy.visit('http://localhost:3000/')
  })

  it('Login page can be opened', function() {
    cy.get('body').contains('Log in to application')
  })

  it('Logging in works', function() {
    cy.get('#usernameInput').type('test')
    cy.get('#passwordInput').type('test')
    cy.get('#loginButton').click()

    cy.get('body').should('contain', 'tester is logged in').and('contain', 'Logged in as tester')
  })
})