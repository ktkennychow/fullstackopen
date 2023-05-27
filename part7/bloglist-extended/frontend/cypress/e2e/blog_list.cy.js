describe('Blog app', function () {
  beforeEach(function () {
    cy.request('POST', 'http://localhost:3003/api/testing/reset')
    const user1 = {
      name: 'Benny Cho',
      username: 'bencho',
      password: 'okayokay'
    }
    cy.request('POST', 'http://localhost:3003/api/users', user1)
    const user2 = {
      name: 'Wendy Maria',
      username: 'wenma',
      password: 'sososo'
    }
    cy.request('POST', 'http://localhost:3003/api/users', user2)
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
      describe('When a blog is created', function () {
        beforeEach(function () {
          cy.contains('new blog').click()
          cy.get('#title-input').type('this is blog One')
          cy.get('#author-input').type('May Cho')
          cy.get('#url-input').type('www.example1.com')
          cy.contains('create').click()
          cy.contains('new blog').click()
          cy.get('#title-input').type('this is blog Two')
          cy.get('#author-input').type('May Cho')
          cy.get('#url-input').type('www.example2.com')
          cy.contains('create').click()
        })

        it('allows users to like a blog', function () {
          cy.contains('view').click()
          cy.contains('like').click()
          cy.contains('likes 1')
        })

        it('allows the user who created a blog to delete it', function () {
          cy.contains('view').click()
          cy.contains('remove').click()
          cy.get('#main').should('not.contain', 'this is the title')
        })

        it('only shows the delete button for the creator of the blog', function () {
          cy.get('.blog').eq(0).contains('view').click()
          cy.contains('remove')
          cy.contains('logout').click()
          cy.get('#username').type('wenma')
          cy.get('#password').type('sososo')
          cy.get('#login-button').click()
          cy.contains('view').click()
          cy.get('.blog').should('not.contain', 'remove')
        })
        
        it('shows blogs in a descending order of the likes they have', function() {
          cy.get('.blog').eq(0).contains('view').click()// Blog One at the top
          cy.get('.blog').eq(1).contains('view').click()// Blog Two at the second
          cy.get('.blog').eq(1).contains('like').click()// Like Blog Two
          cy.get('.blog').eq(0).contains('this is blog Two')// Blog Two becomes the top
          cy.get('.blog').eq(1).contains('this is blog One')// Blog One becomes the second
        })
      })

    })



  })
})