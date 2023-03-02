const keepAliases = {}

beforeEach(() => {
  Cypress._.toPairs(keepAliases).forEach(([aliasName, value]) => {
    console.log('restoring alias %s', aliasName)
    cy.wrap(value, { log: false }).as(aliasName)
    cy.log(`restored alias **${aliasName}**`)
  })
})

// https://on.cypress.io/as
Cypress.Commands.overwriteQuery('as', function (as, alias, options = {}) {
  // copied some code from cy.as() command implementation
  const prevCommand = cy.state('current').get('prev')
  prevCommand.set('alias', alias)

  // Shallow clone of the existing subject chain, so that future commands running on the same chainer
  // don't apply here as well.
  let subjectChain = [...cy.subjectChain()]

  // If the user wants us to store a specific static value, rather than
  // requery it live, we replace the subject chain with a resolved value.
  // https://github.com/cypress-io/cypress/issues/25173
  if (options.type === 'static') {
    subjectChain = [cy.getSubjectFromChain(subjectChain)]
  }
  const fileName = prevCommand.get('fileName')
  cy.addAlias(cy.state('ctx'), {
    subjectChain,
    command: prevCommand,
    alias,
    fileName,
  })

  // Only need to update the log messages of previous commands once.
  // Subsequent invocations can shortcut to just return the subject unchanged.
  let alreadyDone = false
  return (subject) => {
    if (alreadyDone) {
      return subject
    }
    alreadyDone = true
    console.log('as', subject, alias, options)
    if (options && options.keep === true) {
      keepAliases[alias] = subject
    }
    return subject
  }
})
