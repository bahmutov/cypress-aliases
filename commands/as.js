const keepAliases = {}

beforeEach(() => {
  Cypress._.toPairs(keepAliases).forEach(([aliasName, value]) => {
    // console.log('restoring alias %s', aliasName)
    cy.wrap(value, { log: false }).as(aliasName)
  })
})

// https://on.cypress.io/as
Cypress.Commands.overwrite('as', function (as, value, aliasName, options = {}) {
  // console.log('as', value, aliasName, options)
  if (options && options.keep === true) {
    keepAliases[aliasName] = value
  }
  return as.call(this, value, aliasName)
})
