// load type definitions that come with Cypress module
// and then add our new commands to the "cy" object
/// <reference types="cypress" />

interface AsOptions {
  /**
   * Keep the aliased value and automatically recreate it
   * before each test.
   * @example cy.wrap(...).as('myValue', { keep: true })
   */
  keep: boolean
}

declare namespace Cypress {
  interface Chainable {
    as(aliasName: string, options?: AsOptions): Chainable<any>
  }
}
