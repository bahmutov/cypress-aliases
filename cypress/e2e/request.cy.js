import '../../commands/request'

// testing using mock REST api
// https://my-json-server.typicode.com/

it('cy.request URL', () => {
  cy.wrap(2).as('postId')
  cy.request('https://my-json-server.typicode.com/typicode/demo/posts/@postId')
    .its('body')
    .should('deep.equal', {
      id: 2,
      title: 'Post 2',
    })
})

it('cy.request URL several aliases', () => {
  cy.wrap('posts').as('resource')
  cy.wrap(2).as('postId')
  cy.request(
    'https://my-json-server.typicode.com/typicode/demo/@resource/@postId',
  )
    .its('body')
    .should('deep.equal', {
      id: 2,
      title: 'Post 2',
    })
})

it('cy.request METHOD URL', () => {
  cy.wrap(2).as('postId')
  cy.request(
    'GET',
    'https://my-json-server.typicode.com/typicode/demo/posts/@postId',
  )
    .its('body')
    .should('deep.equal', {
      id: 2,
      title: 'Post 2',
    })
})
