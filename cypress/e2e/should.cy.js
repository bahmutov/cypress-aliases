import '../../commands/should'

it('replaces the aliases value', () => {
  cy.wrap(42).as('answer')
  cy.wrap(20 + 22).should('equal', '@answer')
})
