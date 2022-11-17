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

Cypress.Commands.overwrite('request', function (request, method, url, body) {
  // console.log({
  //   n: arguments.length,
  //   method,
  //   url,
  //   body,
  // })
  if (arguments.length === 2) {
    if (typeof method === 'object') {
      const options = method
      if (options.url) {
        options.url = resolveInUrl(options.url)
      }
      return request(options)
    } else if (typeof method === 'string') {
      url = method
      url = resolveInUrl(url)
      return request(url)
    }
  } else if (arguments.length === 3) {
    url = resolveInUrl(url)
    // @ts-ignore
    return request(method, url)
  } else if (arguments.length === 4) {
    url = resolveInUrl(url)
    // @ts-ignore
    return request(method, url, body)
  }

  // @ts-ignore
  return request(method, url)
})
