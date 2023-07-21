// @ts-check
import '../../commands/should'
// https://github.com/bahmutov/cypress-map
import 'cypress-map'

it.skip('compares two lists', () => {
  cy.visit('cypress/e2e/list.html')
  cy.get('#fruits li')
    .should('have.length', 3)
    .then(($els) => Cypress.$.makeArray($els).map((el) => el.innerText))
    .invoke('sort')
    .then((fruits) => {
      cy.get('#ordered li')
        .should('have.length', 3)
        .then(($els) => Cypress.$.makeArray($els).map((el) => el.innerText))
        .invoke('sort')
        .should('deep.equal', fruits)
    })
})

it('compares two lists (cypress-map)', () => {
  cy.visit('cypress/e2e/list.html')
  cy.get('#fruits li')
    .should('have.length', 3)
    .map('innerText')
    .invoke('sort')
    .then((fruits) => {
      cy.get('#ordered li')
        .map('innerText')
        .invoke('sort')
        .should('deep.equal', fruits)
    })
})
