describe('LOGIN', () => {
  beforeEach(() => {
    cy.visit('/')
  })
  it('carga la pantalla', () => {
    cy.contains('Inicia session')
  })
  it('Muestra mensaje de error al no ingresar usuario', () => {
    cy.get('#user').click()
    cy.get('#password').click()
    cy.get('#mat-error-1').contains('El Usuario es requerido')
  })
  it('Muestra mensaje de error al no ingresar contraseña', () => {
    cy.get('#password').click()
    cy.get('#user').click()
    cy.get('#mat-error-0').contains('La contraseña es requerida')
  })
  it('el boton de inicio session valida el formulario', () => {
    cy.get('#user').click()
    cy.get('#password').click()
    cy.get('.fuse-mat-button-large').should('be.disabled')
  })
  it('no ingresa con credenciales incorrectas', () => {
    cy.login({ user: 'fdjsk', pass: 'fjdkjfkd' })
    cy.url().should('include', '/sign-in')
  })
  it('inicia session con las credenciales correctas', () => {
    cy.fixture('credentials').then((c) => {
      cy.login(c.desarrollo)
      cy.url().should('include', 'tickets/list')
    })
  })
  it('cierra session', () => {
    cy.token('/')
    cy.get('user > .mat-focus-indicator').click()
    cy.get('.mat-menu-content > :nth-child(3)').click()
    cy.url().should('include', 'sign-out')
  })
  it('al cerrar session borra el token', () => {
    cy.token('/')
    cy.get('user > .mat-focus-indicator').click()
    cy.get('.mat-menu-content > :nth-child(3)').click()
    cy.wait(1000).then(() => {
      expect(localStorage.getItem('accessToken')).to.be.null
    })
  })
})
