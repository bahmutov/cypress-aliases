// @ts-check
/// <reference path="../../commands/index.d.ts" />
import '../../commands/all'

it('yields all registered aliases', () => {
  cy.wrap(1).as('one')
  cy.wrap(2).as('two')
  cy.wrap(3).as('three')
  cy.getAllAliases().should('deep.equal', { one: 1, two: 2, three: 3 })
})

it('retries', () => {
  const person = {}
  cy.wrap(1).as('one')
  cy.wrap(person).as('person')
  cy.getAllAliases().should('deep.equal', { one: 1, person: { name: 'Joe' } })

  setTimeout(() => {
    person.name = 'Joe'
  }, 1000)
})
