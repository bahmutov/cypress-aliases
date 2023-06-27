Cypress.Commands.addQuery('getAllAliases', () => {
  return () => {
    const availableAliases = cy.state('aliases')
    // availableAliases is an object with
    // { [alias name]: ... }
    return Cypress._.mapValues(availableAliases, (alias, aliasName) =>
      Cypress._.last(alias.subjectChain),
    )
  }
})
