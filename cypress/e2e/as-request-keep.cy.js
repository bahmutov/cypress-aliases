// @ts-check
/// <reference path="../../commands/index.d.ts" />

import '../../commands/request'
import '../../commands/as'

const api = 'http://localhost:3000'

before(() => {
  cy.request('POST', `${api}/reset`, { todos: [] })
  cy.request('POST', `${api}/todos`, { title: 'test todo' })
    .its('body.id')
    .should('be.a', 'number')
    .as('id', { keep: true })
})

it('has the posted object', () => {
  cy.request(`${api}/todos/@id`).its('body.title').should('equal', 'test todo')
})

it('still has the posted object', () => {
  cy.request(`${api}/todos/@id`).its('body.title').should('equal', 'test todo')
})

it('updates an object', () => {
  cy.request(`${api}/todos/@id`)
    .its('body')
    .should('deep.include', { title: 'test todo' })
  cy.request('PATCH', `${api}/todos/@id`, { completed: true })
  cy.request(`${api}/todos/@id`)
    .its('body')
    .should('deep.include', { title: 'test todo', completed: true })
  cy.request('DELETE', `${api}/todos/@id`)
  // invalidate the "id" alias?
})
