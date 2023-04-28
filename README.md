# cypress-aliases ![cypress version](https://img.shields.io/badge/cypress-12.11.0-brightgreen)

> A plugin that makes working with Cypress aliases much simpler

- 🎓 This plugin is covered by my course [Cypress Plugins](https://cypress.tips/courses/cypress-plugins)
  - [Lesson g2: Simplify assertions using the alias syntax](https://cypress.tips/courses/cypress-plugins/lessons/g2)
  - [Lesson g3: Check the text on the page using an alias access](https://cypress.tips/courses/cypress-plugins/lessons/g3)
  - [Lesson g4: Use resolved aliases to make API requests](https://cypress.tips/courses/cypress-plugins/lessons/g4)
  - [Lesson g5: Reuse the alias shortcut created in before hook](https://cypress.tips/courses/cypress-plugins/lessons/g5)

## Install

Add this plugin as a dev dependency to your project

```shell
$ npm i -D cypress-aliases
# or install using Yarn
$ yarn add -D cypress-aliases
```

### Cypress version support

| cypress-aliases | Cypress |
| --------------- | ------- |
| v1              | < v12   |
| v2              | >= v12  |

## Use

You can include all overwritten commands from this plugin by importing just the plugin from your spec or support file:

```js
import 'cypress-aliases'
// same as
import 'cypress-aliases/commands'
```

Alternatively, you can import the individual source files to overwrite the commands you want to automatically resolve the aliases

```js
import 'cypress-aliases/commands/should'
import 'cypress-aliases/commands/contains'
import 'cypress-aliases/commands/wrap'
import 'cypress-aliases/commands/request'
import 'cypress-aliases/commands/as'
import 'cypress-aliases/commands/type'
```

## API

### should

Allows you to use aliased values in the `.should(...)` [implicit assertions](https://glebbahmutov.com/cypress-examples/commands/assertions.html).

```js
cy.wrap(42).as('answer')
cy.wrap(20 + 22).should('equal', '@answer')
```

See [cypress/e2e/should.cy.js](./cypress/e2e/should.cy.js) spec file

### contains

Overwrites the [cy.contains](https://on.cypress.io/contains) command to automatically substitute the resolved aliased values into the text you are looking for.

```html
<div id="number">42</div>
<p>Hello there <span class="name">Cy</span></p>
```

```js
cy.wrap('Cy').as('name')
cy.contains('p', 'Hello there @name')
```

See [cypress/e2e/contains.cy.js](./cypress/e2e/contains.cy.js) spec file

## type

You can type the aliased current value, either by itself or as part of a longer string

```js
cy.wrap('hello').as('greeting')
cy.get('#memo').type('@greeting world!')
cy.get('#memo').should('have.value', 'hello world!')
```

See [cypress/e2e/type.cy.js](./cypress/e2e/type.cy.js)

### wrap

Overwrites the [cy.wrap](https://on.cypress.io/wrap) command and resolves all words that start with `@`

```js
cy.wrap('Hello').as('greeting')
cy.wrap('world').as('name')
cy.wrap('@greeting there @name').should('equal', 'Hello there world')
```

See [cypress/e2e/wrap.cy.js](./cypress/e2e/wrap.cy.js) spec file.

Note: if you simply want to look up a single aliased value, use [cy.get](https://on.cypress.io/get) instead

```js
cy.wrap(42).as('n')
cy.get('@n').should('equal', 42)
```

### request

Overwrites the [cy.request](https://on.cypress.io/request) command to change the URL using any included aliases

```js
cy.wrap('posts').as('resource')
cy.wrap(2).as('postId')
// makes the request to /api/posts/2
cy.request('/api/@resource/@postId')
```

See [cypress/e2e/request.cy.js](./cypress/e2e/request.cy.js) spec file.

### as

Every registered Cypress alias is removed before every test. Thus one needs to recreate the aliases before each test. This module overwrites the [cy.as](https://on.cypress.io/as) command to add `keep: true` option. The kept aliases are restored automatically before each test.

```js
before(() => {
  cy.request('POST', '/items')
    .its('body.id')
    // preserve the alias and restore
    // it before every future test
    .as('id', { keep: true })
})

it('has the item alias', () => {
  cy.get('@id')
})

it('still has the item alias', () => {
  cy.get('@id')
})
```

## Small print

Author: Gleb Bahmutov &lt;gleb.bahmutov@gmail.com&gt; &copy; 2022

- [@bahmutov](https://twitter.com/bahmutov)
- [glebbahmutov.com](https://glebbahmutov.com)
- [blog](https://glebbahmutov.com/blog)
- [videos](https://www.youtube.com/glebbahmutov)
- [presentations](https://slides.com/bahmutov)
- [cypress.tips](https://cypress.tips)
- [Cypress Tips & Tricks Newsletter](https://cypresstips.substack.com/)
- [my Cypress courses](https://cypress.tips/courses)

License: MIT - do anything with the code, but don't blame me if it does not work.

Support: if you find any problems with this module, email / tweet /
[open issue](https://github.com/bahmutov/cypress-aliases/issues) on Github
