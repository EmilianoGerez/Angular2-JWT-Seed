# Angular 2 JWT Seed

Based on [angular.io quickstart](https://angular.io/docs/ts/latest/quickstart.html),

```
## Install npm packages

Install the npm packages described in the `package.json` and verify that it works:

**Attention Windows Developers:  You must run all of these commands in administrator mode**

```bash
npm install
npm start
```

Run the `gulp` command for compile and serve the app.

Shut it down manually with Ctrl-C.

You're ready to write your application.

### npm scripts

We've captured many of the most useful commands in npm scripts defined in the `package.json`:

* `npm start` - runs the compiler and a server at the same time, both in "watch mode".
* `npm run tsc` - runs the TypeScript compiler once.
* `npm run tsc:w` - runs the TypeScript compiler in watch mode; the process keeps running, awaiting changes to TypeScript files and re-compiling when it sees them.
* `npm run lite` - runs the [lite-server](https://www.npmjs.com/package/lite-server), a light-weight, static file server, written and maintained by
[John Papa](https://github.com/johnpapa) and
[Christopher Martin](https://github.com/cgmartin)
with excellent support for Angular apps that use routing.
* `npm run typings` - runs the typings tool.
* `npm run postinstall` - called by *npm* automatically *after* it successfully completes package installation. This script installs the TypeScript definition files this app requires.

Here are the test related scripts:
* `npm test` - compiles, runs and watches the karma unit tests
* `npm run webdriver:update` - ONE TIME update for protractor end-to-end (e2e) tests
* `npm run e2e` - run protractor e2e tests, written in JavaScript (*e2e-spec.js)