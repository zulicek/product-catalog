describe('Login', () => {
  beforeEach(() => {
    cy.visit('http://localhost:3000')
  })

  it('displays login form and allows user to log in', () => {
    cy.get('[data-testid="login-button"]').trigger('mouseover')
    cy.get('[data-testid="login-form"]').should('be.visible')
    cy.get('[data-testid="username-input"]').type('emilys')
    cy.get('[data-testid="password-input"]').type('emilyspass')
    cy.get('[data-testid="login-submit"]').click()
    cy.get('[data-testid="user-greeting"]').should('contain', 'Welcome, emilys')
  })

  it('shows an error message with invalid credentials', () => {
    cy.get('[data-testid="login-button"]').trigger('mouseover')
    cy.get('[data-testid="username-input"]').type('wronguser')
    cy.get('[data-testid="password-input"]').type('wrongpassword')
    cy.get('[data-testid="login-submit"]').click()

    cy.get('[data-testid="login-error"]').should('be.visible')
    cy.get('[data-testid="login-error"]').should('contain', 'Invalid username or password')
  })
})