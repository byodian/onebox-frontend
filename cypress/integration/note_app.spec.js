describe('Note app', function () {
  beforeEach(function () {
    cy.request('POST', 'http://localhost:3001/api/testing/reset');
    const user = {
      name: 'superuser',
      username: 'root',
      password: 'selerina'
    };
    cy.request('POST', 'http://localhost:3001/api/users/', user);
    cy.visit('http://localhost:3000');
  });

  describe('basic UI test', function () {
    beforeEach(function() {
      cy.visit('http://localhost:3000');
    });

    it('front page can be opened', function() {
      cy.contains('Notes');
      cy.contains('Note app, Department of Computer Science, University of Helsinki 2021');
    });

    it('login form can be opened', function () {
      cy.contains('login').click();
      cy.get('html').should('contain', 'login');
    });

    it('user can login', function() {
      cy.contains('login').click();
      cy.get('#username').type('root');
      cy.get('#password').type('selerina');
      cy.get('#login-button').click();
      cy.contains('superuser logged-in');
    });

    it('login fails with wrong password', function() {
      cy.contains('login').click();
      cy.get('#username').type('root');
      cy.get('#password').type('wrong');
      cy.get('#login-button').click();

      cy.get('.error')
        .should('contain', 'Wrong credentials')
        .and('have.css', 'color', 'rgb(255, 0, 0)')
        .and('have.css', 'border', '3px solid rgb(255, 0, 0)');

      cy.get('html').should('not.contain', 'superuser logged-in');
    });

  });

  describe('when logged in', function() {
    beforeEach(function() {
      cy.login({ username: 'root', password: 'selerina' });
    });

    it('a new note can be created', function() {
      const str = 'You are the apple of my eyes';
      cy.contains('new note').click();
      cy.get('#note-input').type(str);
      cy.contains('save').click();
      cy.contains(str);
    });

    describe('and a note exists', function() {
      beforeEach(function () {
        cy.createNote({ content: 'first note', important: false });
        cy.createNote({ content: 'second note', important: false });
        cy.createNote({ content: 'third note', important: false });
      });

      it.only('it can be made important', function () {
        cy.contains('second note').parent().find('button').as('theButton');
        cy.get('@theButton').click();
        cy.get('@theButton').should('contain', 'make not important');
      });
    });
  });
});