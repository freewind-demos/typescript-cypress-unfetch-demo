// ***********************************************************
// This example support/index.js is processed and
// loaded automatically before your test files.
//
// This is a great place to put global configuration and
// behavior that modifies Cypress.
//
// You can change the location of this file or turn off
// automatically serving support files with the
// 'supportFile' configuration option.
//
// You can read more here:
// https://on.cypress.io/configuration
// ***********************************************************

// let unfetchPolyfill: string = '';
//
// before(() => {
//   const polyfillUrl = 'https://unpkg.com/unfetch@4.1.0/dist/unfetch.umd.js'
//   cy.request(polyfillUrl)
//     .then((response) => {
//       unfetchPolyfill = response.body
//     })
// })

const unfetchPath = './node_modules/unfetch/dist/unfetch.umd.js';

export function applyUnfetchPolyfill() {
  let unfetchPolyfill: string = '';
  cy.readFile(unfetchPath)
    .then((code) => {
      unfetchPolyfill = code;
    });

  Cypress.on('window:before:load', (win: any) => {
    if (win.unfetch) {
      return;
    }
    win.eval(unfetchPolyfill);
    win.fetch = win.unfetch;
  });
}

before(() => {
  applyUnfetchPolyfill();
});
