// @ts-check

// automatically replace any string values that start with "@"
// with the aliased value, if it exists
Cypress.Commands.overwrite('contains', (contains, subject, selector, text) => {
  if (typeof text === 'undefined') {
    // @ts-ignore
    text = selector
    selector = undefined
  }

  if (typeof text === 'string') {
    // @ts-ignore
    const aliases = cy.state('aliases')
    // look up every word in the given string "s"
    // and if it starts with "@" character, check if there
    // is an alias with that name. If there is, replace
    // the "@name" with the current value
    // @ts-ignore
    const words = text.split(' ')
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
    console.log({ selector, replaced })
    return contains(subject, selector, replaced)
  } else {
    // if the text we are looking for
    // is anything else, like a regular expression
    // then just call the original cy.contains command
    return contains(subject, selector, text)
  }
})
