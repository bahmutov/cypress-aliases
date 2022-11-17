// @ts-check

Cypress.Commands.overwrite('request', (request, method, url) => {
  console.log({ method, url })
  if (typeof url === 'undefined') {
    url = method
    // @ts-ignore
    method = 'GET'
  }

  if (typeof url === 'string') {
    // @ts-ignore
    const aliases = cy.state('aliases')
    Cypress._.forEach(aliases, (alias, key) => {
      // @ts-ignore
      url = url.replaceAll('@' + key, aliases[key].subject)
    })
    return request(url)
  } else {
    return request(url)
  }
})
