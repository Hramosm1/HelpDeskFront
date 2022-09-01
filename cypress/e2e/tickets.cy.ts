describe('Tickets', () => {
  beforeEach(() => {
    cy.token('/tickets/list');
  });
  it('Carga la pagina', () => {
    cy.url().should('include', 'tickets/list');
  });
  it('El titulo es correcto', () => {
    cy.get('h3.font-medium').contains('Tickets');
    cy.get('.text-3xl').contains('Listado');
  });
  it('validacion formulario crear ticket', () => {
    cy.get('.flex > .mat-primary').click();
    cy.get('.order-first').should('be.disabled');
  });
  it('crea ticket sin personal de soporte', () => {
    cy.intercept({ method: 'POST', url: 'http://192.168.8.28:9411/tickets' }).as('api');
    cy.get('.flex > .mat-primary').click();
    cy.get('#mat-input-0').type('Prueba e2e sin personal');
    cy.get('#mat-select-value-3').click();
    cy.get('mat-option:first').click();
    cy.get('#mat-select-value-5').click();
    cy.get('mat-option:first').click();
    cy.get('#mat-select-value-7').click();
    cy.get('mat-option:first').click();
    cy.get('#mat-optgroup-label-0').type('{esc}');
    cy.get('.ql-editor').type('Este ticket es una prueba');
    cy.get('.order-first').click();
    cy.wait('@api').then(res => expect(res.response.statusCode).to.be.equal(201));
  });
  it('asigna personal de soporte', () => {
    cy.intercept({ method: 'GET', url: 'http://192.168.8.28:9411/tickets/**' }).as('api');
    cy.intercept({ method: 'PUT', url: 'http://192.168.8.28:9411/tickets/**' }).as('apiPost');
    cy.wait('@api').then(() => {
      cy.get('.mat-row:first').dblclick();
      cy.get('.mat-acent').click();
      cy.get('mat-select:first').click();
      cy.get('mat-option:first').click();
      cy.get('.mat-dialog-actions > .mat-raised-button').click();
    });
    cy.wait('@apiPost').then((res) => {
      expect(res.response.statusCode).to.be.equal(200);
    });
  });
  it('crea un comentario', () => {
    cy.intercept({ method: 'GET', url: 'http://192.168.8.28:9411/tickets/**' }).as('api');
    cy.intercept({ method: 'POST', url: 'http://192.168.8.28:9411/comentarios' }).as('apiPost');
    cy.wait('@api').then(() => {
      cy.get('.mat-row:first').dblclick();
      cy.get('.ql-editor').type('comentario de prueba');
      cy.get('app-comments > .mat-focus-indicator').click();
    });
    cy.wait('@apiPost').then((res) => {
      expect(res.response.statusCode).to.be.equal(201);
    });
  });
  it('cierra ticket', () => {
    cy.intercept({ method: 'GET', url: 'http://192.168.8.28:9411/tickets/**' }).as('api');
    cy.intercept({ method: 'PUT', url: 'http://192.168.8.28:9411/tickets/**' }).as('apiPost');
    cy.wait('@api').then(() => {
      cy.get('.mat-row:first').dblclick();
      cy.get('.mat-warn').click();
      cy.get('textarea').type('comentario de cierre cypress');
      cy.get('.mat-dialog-actions > .mat-raised-button').click();
    });
    cy.wait('@apiPost').then((res) => {
      expect(res.response.statusCode).to.be.equal(200);
    });
  });
  it('crea ticket con personal de soporte', () => {
    cy.intercept({ method: 'POST', url: 'http://192.168.8.28:9411/tickets' }).as('api');
    cy.get('.flex > .mat-primary').click();
    cy.get('#mat-input-0').type('Prueba e2e con personal');
    cy.get('#mat-select-value-3').click();
    cy.get('mat-option:first').click();
    cy.get('#mat-select-value-5').click();
    cy.get('mat-option:first').click();
    cy.get('#mat-select-value-7').click();
    cy.get('mat-option:first').click();
    cy.get('#mat-optgroup-label-0').type('{esc}');
    cy.get('.ql-editor').type('Este ticket es una prueba');
    cy.get('#mat-select-value-9').click();
    cy.get('mat-option:first').click();
    cy.get('.order-first').click();
    cy.wait('@api').then(res => expect(res.response.statusCode).to.be.equal(201));
  });
});
