// @ts-check

Cypress.Commands.overwrite('request', (request, url) => {
  if (typeof url === 'string') {
    // @ts-ignore
    const aliases = cy.state('aliases')
    Cypress._.forEach(aliases, (alias, key) => {
      console.log('checking', { key, alias })
      // @ts-ignore
      url = url.replaceAll('@' + key, aliases[key].subject)
    })
    return request(url)
  } else {
    return request(url)
  }
})
