// @ts-check
/// <reference path="../../commands/index.d.ts" />
import '../../commands/as'

before(() => {
  // will be available in every test
  cy.wrap(42).as('answer', {
    keep: true,
  })
  // only available in the first test
  cy.wrap('hello').as('hello')
})

it('is available in the first test', () => {
  cy.get('@answer').should('equal', 42)
  cy.get('@hello').should('equal', 'hello')
})

it('is not available in the second test', () => {
  cy.get('@answer').should('equal', 42)
  // will throw an error, since there is no alias
  // cy.get('@hello').should('equal', 'hello')
})
