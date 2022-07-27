describe('Prioridades', () => {
  beforeEach(() => {
    cy.token('/mantenimientos/prioridades')
  })
  it('Carga la pagina', () => {
    cy.url().should('include', 'mantenimientos/prioridades')
  })
  it('El titulo es correcto', () => {
    cy.get('h3.font-medium').contains('Mantenimientos')
    cy.get('.text-3xl').contains('Prioridades')
  })
  it('creacion', () => {
    cy.get('.fixed > .mat-focus-indicator > .mat-button-wrapper').click()
  })
  //it('', () => { })
})

describe('Estados', () => {
  beforeEach(() => {
    cy.token('/mantenimientos/estados')
  })
  it('Carga la pagina', () => {
    cy.url().should('include', 'mantenimientos/estados')
  })
  it('El titulo es correcto', () => {
    cy.get('h3.font-medium').contains('Mantenimientos')
    cy.get('.text-3xl').contains('Estados')
  })
  //it('', () => { })
})

describe('Categorias', () => {
  beforeEach(() => {
    cy.token('/mantenimientos/categorias')
  })
  it('Carga la pagina', () => {
    cy.url().should('include', 'mantenimientos/categorias')
  })
  it('El titulo es correcto', () => {
    cy.get('h3.font-medium').contains('Mantenimientos')
    cy.get('.text-3xl').contains('Categorías')
  })
  it('creacion', () => {
    cy.get('.fixed > .mat-focus-indicator > .mat-button-wrapper').click()
  })
  //it('', () => { })
})

describe('Personal de soporte', () => {
  beforeEach(() => {
    cy.token('/mantenimientos/personal-de-soporte')
  })
  it('Carga la pagina', () => {
    cy.url().should('include', 'mantenimientos/personal-de-soporte')
  })
  it('El titulo es correcto', () => {
    cy.get('h3.font-medium').contains('Mantenimientos')
    cy.get('.text-3xl').contains('Personal De Soporte')
  })
  //it('', () => { })
})

/*describe('Notificaciones', () => {
  beforeEach(() => {
  cy.token('/mantenimientos/notificaciones')
  })
  it('Carga la pagina', () => {
    cy.url().should('include', 'mantenimientos/notificaciones')
  })
  it('El titulo es correcto', () => {
    cy.get('h3.font-medium').contains('Mantenimientos')
    cy.get('.text-3xl').contains('Notificaciones')
  })
  //it('', () => { })
})*/