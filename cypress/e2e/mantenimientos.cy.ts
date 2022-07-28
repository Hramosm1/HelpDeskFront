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
  it('crea una prioridad', () => {
    cy.intercept({ method: 'POST', url: 'http://192.168.8.28:9411/prioridades' }).as('api')
    cy.get('.fixed > .mat-focus-indicator > .mat-button-wrapper').click()
    cy.get('#mat-input-0').type('prueba e2e')
    cy.get('.ng-untouched').invoke('val', '#ffbbbb')
    cy.get('.mat-dialog-actions > .mat-raised-button').click()
    cy.wait('@api').then(val => {
      expect(val.response.statusCode).to.be.equal(200)
    })
  })
  it('edita la prioridad', () => {
    cy.intercept({ method: 'PUT', url: 'http://192.168.8.28:9411/prioridades/**' }).as('api')
    cy.get('mat-row:last >.mat-column-actions >:nth-child(1)').click()
    cy.get('#mat-input-0').type(' editada')
    cy.get('.ng-untouched').invoke('val', '#cccccc')
    cy.get('.mat-dialog-actions > .mat-raised-button').click()
    cy.wait('@api').then(val => {
      expect(val.response.statusCode).to.be.equal(200)
    })
  })
  it('elimina la prioridad', () => {
    cy.intercept({ method: 'DELETE', url: 'http://192.168.8.28:9411/prioridades/**' }).as('api')
    cy.get('mat-row:last >.mat-column-actions >:nth-child(2)').click()
    cy.get('.mat-dialog-actions > .mat-raised-button').click()
    cy.wait('@api').then(val => {
      expect(val.response.statusCode).to.be.equal(200)
    })
  })
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
  it('crea un estado', () => {
    cy.intercept({ method: 'POST', url: 'http://192.168.8.28:9411/estados' }).as('api')
    cy.get('.fixed > .mat-focus-indicator > .mat-button-wrapper').click()
    cy.get('#mat-input-0').type('prueba e2e')
    cy.get('.mat-dialog-actions > .mat-raised-button').click()
    cy.wait('@api').then(val => {
      expect(val.response.statusCode).to.be.equal(200)
    })
  })
  it('edita un estado', () => {
    cy.intercept({ method: 'PUT', url: 'http://192.168.8.28:9411/estados/**' }).as('api')
    cy.get('mat-row:last >.mat-column-actions >:nth-child(1)').click()
    cy.get('#mat-input-0').type(' editada')
    cy.get('.mat-dialog-actions > .mat-raised-button').click()
    cy.wait('@api').then(val => {
      expect(val.response.statusCode).to.be.equal(200)
    })
  })
  it('elimina un estado', () => {
    cy.intercept({ method: 'DELETE', url: 'http://192.168.8.28:9411/estados/**' }).as('api')
    cy.get('mat-row:last >.mat-column-actions >:nth-child(2)').click()
    cy.get('.mat-dialog-actions > .mat-raised-button').click()
    cy.wait('@api').then(val => {
      expect(val.response.statusCode).to.be.equal(200)
    })
  })
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
  it('crea una categoria', () => {
    cy.intercept({ method: 'POST', url: 'http://192.168.8.28:9411/categorias' }).as('api')
    cy.get('app-tabla-categorias > .mat-card > .absolute').click()
    cy.get('input').type('prueba e2e')
    cy.get('.mat-dialog-actions > .mat-raised-button').click()
    cy.wait('@api').then((request) => {
      expect(request.response.statusCode).to.be.equal(200)
    })
  })
  it('edita una categoria', () => {
    cy.intercept({ method: 'PUT', url: 'http://192.168.8.28:9411/categorias/**' }).as('api')
    cy.get('app-tabla-categorias mat-row:last .cdk-column-actions > :nth-child(1)').click()
    cy.get('input').type(' editada')
    cy.get('.mat-dialog-actions > .mat-raised-button').click()
    cy.wait('@api').then((request) => {
      expect(request.response.statusCode).to.be.equal(200)
    })

  })
  it('crea una sub categoria', () => {
    cy.intercept({ method: 'POST', url: 'http://192.168.8.28:9411/subCategorias' }).as('api')
    cy.get('app-tabla-sub-categorias > .mat-card > .absolute').click()
    cy.get('#mat-input-0').type('prueba e2e')
    cy.get('mat-dialog-content mat-select').click()
    cy.get('.mat-option-text:last').click()
    cy.get('.mat-dialog-actions > .mat-raised-button').click()
    cy.wait('@api').then((request) => {
      expect(request.response.statusCode).to.be.equal(200)
    })
  })
  it('edita una sub categoria', () => {
    cy.intercept({ method: 'PUT', url: 'http://192.168.8.28:9411/subCategorias/**' }).as('api')
    cy.get('app-tabla-sub-categorias mat-row:last .cdk-column-actions > :nth-child(1)').click()
    cy.get('#mat-input-0').type(' editada')
    cy.get('mat-dialog-content mat-select').click()
    cy.get('.mat-option-text:last').click()
    cy.get('.mat-dialog-actions > .mat-raised-button').click()
    cy.wait('@api').then((request) => {
      expect(request.response.statusCode).to.be.equal(200)
    })
  })
  it('elimina una sub categoria', () => {
    cy.intercept({ method: 'DELETE', url: 'http://192.168.8.28:9411/subCategorias/**' }).as('api')
    cy.get('app-tabla-sub-categorias mat-row:last .cdk-column-actions > :nth-child(2)').click()
    cy.get('.mat-dialog-actions > .mat-raised-button').click()
    cy.wait('@api').then((request) => {
      expect(request.response.statusCode).to.be.equal(200)
    })

  })
  it('elimina una categoria', () => {
    cy.intercept({ method: 'DELETE', url: 'http://192.168.8.28:9411/categorias/**' }).as('api')
    cy.get('app-tabla-categorias mat-row:last .cdk-column-actions > :nth-child(2)').click()
    cy.get('.mat-dialog-actions > .mat-raised-button').click()
    cy.wait('@api').then((request) => {
      expect(request.response.statusCode).to.be.equal(200)
    })


  })
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
  it('prueba el buscador de personal', () => {
    cy.intercept({ method: 'GET', url: 'http://192.168.8.28:9401/usuarios' }).as('apiusuarios')
    cy.get('.fixed > .mat-focus-indicator').click()
    cy.wait('@apiusuarios').then(() => {
      cy.wait(1000).then(() => {
        cy.get('input').type('diego')
        cy.contains('DIEGO DONIS')
      })
    })
  })
  it('crea un nuevo personal', () => {
    cy.intercept({ method: 'GET', url: 'http://192.168.8.28:9401/usuarios' }).as('apiusuarios')
    cy.intercept({ method: 'POST', url: 'http://192.168.8.28:9411/personalDeSoporte' }).as('apipersonal')
    cy.get('.fixed > .mat-focus-indicator').click()
    cy.wait('@apiusuarios').then(() => {
      cy.wait(1000).then(() => {
        cy.get('.mat-dialog-content mat-row:first').click()
      })
    })
    cy.wait('@apipersonal').then((api) => {
      expect(api.response.statusCode).to.be.equal(200)
    })
  })
  it('elimina el personal', () => {
    cy.intercept({ method: 'DELETE', url: 'http://192.168.8.28:9411/personalDeSoporte/**' }).as('apipersonal')
    cy.get('.mat-row:last mat-icon').click()
    cy.wait('@apipersonal').then((api) => {
      expect(api.response.statusCode).to.be.equal(200)
    })
  })
})
/*
describe('Notificaciones', () => {
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
  it('', () => { })
})*/
