import { test, html } from './utils'

test('[x-sync] creates a passive target',
  html`<div id="sync" x-sync></div><a href="/tests" x-target id="replace">Link</a>`,
  ({ get }) => {
    cy.intercept('GET', '/tests', {
      statusCode: 200,
      body: '<h1 id="title">Success</h1><div id="replace">Replaced</div><div id="sync">Synced</div>'
    }).as('response')
    cy.get('a').click()
    cy.wait('@response').then(() => {
      cy.get('#title').should('not.exist')
      cy.get('#sync').should('have.text', 'Synced')
    })
  }
)
