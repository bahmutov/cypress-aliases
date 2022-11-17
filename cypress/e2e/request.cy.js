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

it('cy.request options object', () => {
  cy.wrap(2).as('postId')
  cy.request({
    url: 'https://my-json-server.typicode.com/typicode/demo/posts/@postId',
  })
    .its('body')
    .should('deep.equal', {
      id: 2,
      title: 'Post 2',
    })
})

it('posts an object', () => {
  const api = 'http://localhost:3000'
  cy.request('POST', `${api}/reset`, { todos: [] })
  cy.request('POST', `${api}/todos`, { title: 'test todo' })
  cy.request(`${api}/todos`).its('body').should('have.length', 1)
})

it('updates an object', () => {
  const api = 'http://localhost:3000'
  cy.request('POST', `${api}/todos`, { title: 'test todo' })
    .its('body.id')
    .should('be.a', 'number')
    .as('id')
  cy.request(`${api}/todos/@id`)
    .its('body')
    .should('deep.include', { title: 'test todo' })
  cy.request('PATCH', `${api}/todos/@id`, { completed: true })
  cy.request(`${api}/todos/@id`)
    .its('body')
    .should('deep.include', { title: 'test todo', completed: true })
  cy.request('DELETE', `${api}/todos/@id`)
})
