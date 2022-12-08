import '../../commands/should'

it('compares the days from two input fields', () => {
  cy.visit('cypress/e2e/dates.html')
  cy.get('input[name=start-date]')
    .invoke('val')
    .invoke('split', '/')
    .its(1)
    .then(Number)
    .should('be.within', 1, 31)
    .then((startDay) => {
      cy.get('input[name=end-date]')
        .invoke('val')
        .invoke('split', '/')
        .its(1)
        .then(Number)
        .should('equal', startDay)
    })
})

it('compares the days from two input fields using aliases', () => {
  cy.visit('cypress/e2e/dates.html')
  cy.get('input[name=start-date]')
    .invoke('val')
    .invoke('split', '/')
    .its(1)
    .then(Number)
    .should('be.within', 1, 31)
    .as('startDay')
  cy.get('input[name=end-date]')
    .invoke('val')
    .invoke('split', '/')
    .its(1)
    .then(Number)
    .should('equal', '@startDay')
})

function getDay(selector) {
  return cy
    .get(selector)
    .invoke('val')
    .invoke('split', '/')
    .its(1)
    .then(Number)
    .should('be.within', 1, 31)
}

it('compares the days from two input fields, reusable', () => {
  cy.visit('cypress/e2e/dates.html')
  getDay('input[name=start-date]').as('startDay').should('be.within', 1, 31)
  getDay('input[name=end-date]').should('equal', '@startDay')
})
