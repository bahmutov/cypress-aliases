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

module.exports = { getAliasSubject }
