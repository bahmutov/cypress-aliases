// @ts-check
import '../../commands/should'

it('replaces the aliases value', () => {
  cy.wrap(42).as('answer')
  cy.wrap(20 + 22).should('equal', '@answer')
})

it('ignores unknown aliases', () => {
  cy.wrap(42).as('answer')
  cy.wrap('@unknown').should('equal', '@unknown')
})

it('ignores alias names that don not start with @', () => {
  cy.wrap(42).as('answer')
  cy.wrap('answer').should('equal', 'answer')
})

it('handles arrays and deep.equal', () => {
  cy.wrap(['one', 'two']).as('numbers')
  cy.wrap(['one', 'two']).should('deep.equal', '@numbers')
})

it('handles arrays and deep.equal with timer', () => {
  const expected = []
  cy.wrap(expected).as('numbers')
  cy.wrap(['one', 'two']).should('deep.equal', '@numbers')

  setTimeout(() => {
    expected.push('one')
  }, 1000)

  setTimeout(() => {
    expected.push('two')
  }, 2000)
})

it('handles two arrays and deep.equal with timer', () => {
  const expected = []
  setTimeout(() => {
    expected.push('one')
  }, 1000)

  setTimeout(() => {
    expected.push('two')
  }, 2000)
  cy.wrap(expected).as('numbers')

  const actual = []
  setTimeout(() => {
    actual.push('one')
  }, 1500)

  setTimeout(() => {
    actual.push('two')
  }, 2500)
  cy.wrap(actual).should('deep.equal', '@numbers').and('have.length', 2)
})
