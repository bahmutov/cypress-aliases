# cypress-aliases ![cypress version](https://img.shields.io/badge/cypress-11.1.0-brightgreen)

> A plugin that makes working with Cypress aliases much simpler

## Install

Add this plugin as a dev dependency to your project

```shell
$ npm i -D cypress-aliases
# or install using Yarn
$ yarn add -D cypress-aliases
```

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
