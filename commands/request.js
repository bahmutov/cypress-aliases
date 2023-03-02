// @ts-check

function getAliasSubject(aliasObject) {
  if ('subject' in aliasObject) {
    return aliasObject.subject
  }
  if (Array.isArray(aliasObject.subjectChain)) {
    return aliasObject.subjectChain[0]
  }
  throw new Error(
    `Do not know how to get the subject for alias ${aliasObject.alias}`,
  )
}

function resolveInUrl(url) {
  // @ts-ignore
  const aliases = cy.state('aliases')
  console.log(aliases)
  Cypress._.forEach(aliases, (alias, key) => {
    // @ts-ignore
    url = url.replaceAll('@' + key, getAliasSubject(aliases[key]))
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
  // debugger

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
  return request(method, url, body)
})
