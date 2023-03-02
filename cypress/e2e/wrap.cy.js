// @ts-check
import '../../commands/wrap'

it('replaces the aliased values inside cy.wrap', () => {
  cy.wrap('Hello').as('greeting')
  cy.wrap('world').as('name')
  cy.wrap('@greeting there @name').should('equal', 'Hello there world')
})

it('ignores non-string values', () => {
  cy.wrap(42).as('n')
  cy.get('@n').should('equal', 42)
})
