import '../../commands/contains'

before(() => {
  const html = `
    <body>
      <div id="number">42</div>
      <p>Hello there <span class="name">Cy</span></p>
    </body>
  `
  cy.document().invoke('open').invoke('write', html)
})

it('replaces the aliased value when searching for text', () => {
  cy.wrap(42).as('n')
  cy.contains('@n')
})

it('replaces the aliased value when searching for selector, text', () => {
  cy.wrap(42).as('n')
  cy.contains('#number', '@n')
})

it('replaces the aliased string value when searching for selector, text', () => {
  cy.wrap('Cy').as('name')
  cy.contains('.name', '@name')
})

it('replaces the aliased partial value', () => {
  cy.wrap('Cy').as('name')
  cy.contains('p', 'Hello there @name')
})
