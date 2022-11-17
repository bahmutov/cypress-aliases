// @ts-check

function resolveInUrl(url) {
  // @ts-ignore
  const aliases = cy.state('aliases')
  Cypress._.forEach(aliases, (alias, key) => {
    // @ts-ignore
    url = url.replaceAll('@' + key, aliases[key].subject)
  })
  return url
}

Cypress.Commands.overwrite('request', (request, method, url) => {
  if (typeof method === 'object') {
    const options = method
    if (options.url) {
      options.url = resolveInUrl(options.url)
    }
    return request(options)
  } else if (typeof url === 'undefined') {
    url = method
    // @ts-ignore
    method = 'GET'
  }

  if (typeof url === 'string') {
    url = resolveInUrl(url)
    // @ts-ignore
    return request(method, url)
  }

  // @ts-ignore
  return request(method, url)
})
