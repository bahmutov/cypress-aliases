# cypress-aliases

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
