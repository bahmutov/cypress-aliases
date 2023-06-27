// load type definitions that come with Cypress module
// and then add our new commands to the "cy" object
/// <reference types="cypress" />

declare namespace Cypress {
  interface AsOptions {
    /**
     * Keep the aliased value and automatically recreate it
     * before each test.
     * @example cy.wrap(...).as('myValue', { keep: true })
     */
    keep: boolean
  }
  interface Chainable {
    as(aliasName: string, options?: AsOptions): Chainable<any>

    /**
     * A query that yields an object with all known aliases
     * and their current values.
     * @example
     *  cy.wrap(1).as('one')
     *  cy.getAllAliases().should('deep.equal', { one: 1 })
     * @see https://github.com/bahmutov/cypress-aliases
     */
    getAllAliases(): Chainable<object>
  }
}
