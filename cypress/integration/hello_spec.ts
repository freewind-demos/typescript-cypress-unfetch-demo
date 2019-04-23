describe('Cypress', () => {

  it('should intercept window.fetch with unfetch', () => {
    cy.visit('/index.html', {
      onBeforeLoad(win: Window): void {
        // cy.request('/data.json')
      }
    });

    cy.server();
    cy.route('GET', '/data.json').as('fetchData');

    cy.get('button').click();

    cy.wait('@fetchData').its('status').should('eq', 200);

    cy.get('#data').should('have.text', 'Hello, cypress!')

  })

})
