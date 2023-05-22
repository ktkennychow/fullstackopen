describe('Blog app', function () {
  beforeEach(function () {
    cy.request('POST', 'http://localhost:3003/api/testing/reset')
    const user = {
      name: 'Benny Cho',
      username: 'bencho',
      password: 'okayokay'
    }
    cy.request('POST', 'http://localhost:3003/api/users', user)
    cy.visit('http://localhost:3000')
  })

  it('Login form is shown', function () {
    cy.get('#login-form').should('contain', 'username').and('contain', 'password')
    cy.get('#username')
    cy.get('#password')
  })

  describe('login', function () {
    it('succeeds with correct credentials', function () {
      cy.get('#username').type('bencho')
      cy.get('#password').type('okayokay')
      cy.get('#login-button').click()

      cy.contains('Benny Cho logged in')
    })
    it('fails with wrong credentials', function () {
      cy.get('#username').type('benkao')
      cy.get('#password').type('nononono')
      cy.get('#login-button').click()

      cy.get('#err-msg').should('contain', 'invalid username or password')
      cy.get('#err-msg').should('have.css', 'color', 'rgb(255, 0, 0)')
      cy.get('#err-msg').should('have.css', 'border-style', 'solid')
    })
    describe('When logged in', function () {
      beforeEach(function () {
        cy.get('#username').type('bencho')
        cy.get('#password').type('okayokay')
        cy.get('#login-button').click()
      })

      it('A blog can be created', function () {
        cy.contains('new blog').click()
        cy.get('#title-input').type('this is the title')
        cy.get('#author-input').type('May Cho')
        cy.get('#url-input').type('www.example.com')
        cy.contains('create').click()
        cy.contains('this is the title')
        cy.contains('May Cho')
      })

      it('allows users to like a blog', function () {
        cy.contains('new blog').click()
        cy.get('#title-input').type('this is the title')
        cy.get('#author-input').type('May Cho')
        cy.get('#url-input').type('www.example.com')
        cy.contains('create').click()
        cy.contains('this is the title')
        cy.contains('May Cho')
        cy.contains('view').click()
        cy.contains('like').click()
        cy.contains('likes 1')
      })

      it.only('allows the user who created a blog can delete it', function () {
        cy.contains('new blog').click()
        cy.get('#title-input').type('this is the title')
        cy.get('#author-input').type('May Cho')
        cy.get('#url-input').type('www.example.com')
        cy.contains('create').click()
        cy.contains('this is the title')
        cy.contains('May Cho')
        cy.contains('view').click()
        cy.contains('remove').click()
        cy.get('html').should('not.contain','this is the title')
      })
    })



  })
})