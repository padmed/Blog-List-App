
describe('BlogList', function () {
  beforeEach(function () {
    cy.request('POST', 'http://localhost:3003/api/testing/reset')

    const newUser = {
      name: 'tester',
      username: 'test',
      password: 'test'
    }
    cy.request('POST', 'http://localhost:3003/api/users', newUser)

    cy.visit('http://localhost:3000/')
  })

  it('Login page can be opened', function () {
    cy.get('body').contains('Log in to application')
  })

  describe('Login', function () {
    it('Logging in works', function (){
      cy.get('#usernameInput').type('test')
      cy.get('#passwordInput').type('test')
      cy.get('#loginButton').click()

      cy.get('body').should('contain', 'tester is logged in').and('contain', 'Logged in as tester')
    })

    it('Fails with the wrong credentials', function () {
      cy.get('#usernameInput').type('unexisted')
      cy.get('#passwordInput').type('unexisted')
      cy.get('#loginButton').click()

      cy.contains('Invalid username or password')
        .parent()
        .should('have.css','border', '4px solid rgb(255, 0, 0)')
    })
  })
})