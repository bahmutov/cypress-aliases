const { getAliasSubject } = require('./utils')

// automatically replace any string values that start with "@"
// with the aliased value, if it exists
Cypress.Commands.overwrite('should', (should, ...args) => {
  const aliases = cy.state('aliases')
  const lookedUp = args.map((a) => {
    if (typeof a === 'string' && a[0] === '@') {
      const key = a.slice(1)
      if (key in aliases) {
        return getAliasSubject(aliases[key])
      }
    }
    return a
  })
  return should(...lookedUp)
})
