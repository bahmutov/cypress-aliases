import '../../commands/as'

it('creates an alias in this test', () => {
  cy.wrap(42).as('answer', { keep: true })
})

it('still has this alias', () => {
  cy.get('@answer').should('equal', 42)
})
