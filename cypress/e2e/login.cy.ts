describe('LOGIN', () => {
  it('carga la pantalla', () => {
    cy.visit('/')
    cy.contains('Inicia session')
  })
  it('no ingresa con credenciales incorrectas', () => {
    cy.visit('/')
    cy.get('#user').type('dgf')
    cy.get('#password').type('f5g4')
    cy.get('.fuse-mat-button-large').click()
    cy.url().should('include', '/sign-in')
  })
  it('inicia session con las credenciales correctas', () => {
    cy.visit('/')
    cy.get('#user').type('donis')
    cy.get('#password').type('123456')
    cy.get('.fuse-mat-button-large').click()
    cy.url().should('include', 'tickets/list')
  })
})