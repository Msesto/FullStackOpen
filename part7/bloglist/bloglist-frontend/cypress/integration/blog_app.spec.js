describe('Blog app', function () {
  beforeEach(function () {
    cy.request('POST', 'http://localhost:3001/api/testing/reset')
    const user = {
      name: 'Joker',
      username: 'Joker420',
      password: 'hahaha'
    }
    cy.request('POST', 'http://localhost:3001/api/users/', user)
    cy.visit('http://localhost:3000')
  })

  it('login is displayed', function () {
    cy.contains('username')
    cy.contains('password')
    cy.contains('login')
  })

  describe('Login', function () {
    it('succeeds with correct credentials', function () {
      cy.get('#username').type('Joker420')
      cy.get('#password').type('hahaha')
      cy.get('#loginSubmit').click()

      cy.get('.success').should('contain', 'Welcome back Joker.')
      cy.get('.success').should('have.css', 'color', 'rgb(0, 128, 0)')
    })

    it('fails with wrong credentials', function () {

      cy.get('#username').type('Joker420')
      cy.get('#password').type('notThePassword')
      cy.get('#loginSubmit').click()

      cy.get('.error').should('contain', 'Wrong credentials')
      cy.get('.error').should('have.css', 'color', 'rgb(255, 0, 0)')
    })
  })

  describe('When logged in', function () {
    beforeEach(function () {
      cy.get('#username').type('Joker420')
      cy.get('#password').type('hahaha')
      cy.get('#loginSubmit').click()
    })

    it('A blog can be created, liked and deleted', function () {
      cy.contains('New blog').click()
      cy.get('#authorIn').type('John Wesleigh')
      cy.get('#titleIn').type('John\'s top ten magic tricks')
      cy.get('#urlIn').type('https://Magicherald.party/news/guides/wesleigh/post42')
      cy.get('#submitBlog').click()
      cy.contains('John\'s top ten magic tricks John Wesleigh', { timeout: 10000 })
      cy.get('#info').click()
      cy.get('#like').click().click()
      cy.contains('Likes: 2')
      cy.get('#deleteBtn').click().should('not.exist')
    })
    it('Blogs are ordered by likes', function () {
      cy.wait(3000)
      cy.createBlog({ title: 'hi mom', author: 'John', url: 'http://sayhitomom.net/api/hi', likes: 29 })
      cy.createBlog({ title: 'bonjour mom', author: 'Adolph', url: 'http://sayhitomom.net/api/bonjour', likes: 1337 })
      cy.createBlog({ title: 'hey mom', author: 'Michael', url: 'http://sayhitomom.net/api/hey', likes: 419 })
      cy.createBlog({ title: 'hello mom', author: 'Topa', url: 'http://sayhitomom.net/api/hello', likes: 420 })
      cy.get('#blogList :first-child').contains('bonjour mom Adolph')
    })
  })
})