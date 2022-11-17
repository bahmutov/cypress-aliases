// @ts-check

// automatically replace any string values that start with "@"
// with the aliased value, if it exists
Cypress.Commands.overwrite('wrap', (wrap, value) => {
  if (typeof value === 'string') {
    // @ts-ignore
    const aliases = cy.state('aliases')
    // look up every word in the given string "s"
    // and if it starts with "@" character, check if there
    // is an alias with that name. If there is, replace
    // the "@name" with the current value
    // @ts-ignore
    const words = value.split(' ')
    const lookedUp = words.map((a) => {
      if (typeof a === 'string' && a[0] === '@') {
        const key = a.slice(1)
        if (key in aliases) {
          return aliases[key].subject
        }
      }
      return a
    })
    const replaced = lookedUp.join(' ')
    return wrap(replaced)
  } else {
    return wrap(value)
  }
})
