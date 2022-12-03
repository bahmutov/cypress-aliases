// @ts-check
/// <reference path="../../commands/index.d.ts" />
import '../../commands/type'

it('types the alias only', () => {
  cy.visit('cypress/e2e/type.html')

  // find the row that includes the balance text
  // and then find a child TD cell with "$"
  cy.contains('tr', 'Available balance')
    .contains('td', '$') // yields jQuery object
    .invoke('text') // yields its text
    .invoke('replace', '$', '') // removes "$" character
    .then(parseFloat) // yields a number
    // confirm the balance is reasonable
    .should('be.within', 1, 10_000)
    .as('balance')
  cy.get('#transfer').type('@balance', { delay: 100 })
  cy.get('#transfer').should('have.value', '800')
})

it('types alias inside a longer string', () => {
  cy.visit('cypress/e2e/type.html')
  cy.wrap('hello').as('greeting')
  cy.get('#memo').type('@greeting world!')
  cy.get('#memo').should('have.value', 'hello world!')
})
