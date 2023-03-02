// @ts-check
import '../../commands/should'

it('replaces the aliases value', () => {
  cy.wrap(42).as('answer')
  cy.wrap(20 + 22).should('equal', '@answer')
})

it('ignores unknown aliases', () => {
  cy.wrap(42).as('answer')
  cy.wrap('@unknown').should('equal', '@unknown')
})

it('ignores alias names that don not start with @', () => {
  cy.wrap(42).as('answer')
  cy.wrap('answer').should('equal', 'answer')
})
