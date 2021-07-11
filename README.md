# bcl-js
[![npm version](https://badge.fury.io/js/%40nthparty%2Fbcl.svg#)](https://www.npmjs.com/package/@nthparty/bcl)
[![GitHub Actions Status](https://github.com/nthparty/bcl-js/workflows/Test%20Coveralls/badge.svg)](https://github.com/nthparty/bcl-js/actions)
[![Coverage Status](https://coveralls.io/repos/github/nthparty/bcl-js/badge.svg?branch=main)](https://coveralls.io/github/nthparty/bcl-js?branch=main)

TypeScript library that provides a simple interface for symmetric (i.e., symmetric-key) and asymmetric (i.e., asymmetric-key) encryption/decryption primitives.

Purpose
-------

This library provides simple and straightforward methods for symmetric (i.e., symmetric-key) and asymmetric (i.e., asymmetric-key) cryptographic encryption and decryption capabilities. The library's interface is designed for ease of use and therefore hides from users some of the flexibilities and performance trade-offs that can be leveraged via direct use of the underlying libraries.

The library's name is a reference to [Boron trichloride](https://en.wikipedia.org/wiki/Boron_trichloride), as it is a wrapper for a limited set of capabilities found in [PyNaCl](https://pypi.org/project/PyNaCl/) (which is itself a wrapper library for [libsodium](https://doc.libsodium.org/>). However, it can also be an acronym for _basic cryptographic library_.

Package Installation and Usage
------------------------------

The package is available on npm:

```shell
npm install @nthparty/bcl
```

The library can be imported in the usual ways:

```JavaScript
const BCl = require('path/to/dist/bcl.js');  // Standalone
const BCl = require('path/to/dist/bcl.slim.js')(sodium);  // Slim
const { BCl } = require('@nthparty/bcl');  // Node.js

BCl.ready.then(function () {
    const sk = BCl.Symmetric.secret();
    console.log(sk);  // Secret(32) [Uint8Array] [ ... ]
});
```

The latest browser-optimized distributions can be found [here](https://unpkg.com/browse/@nthparty/bcl/dist/).

Testing and Conventions
-----------------------

All unit tests are executed and their coverage measured when using
[Jest](https://jestjs.io/) (see `jest.config.js` for configuration
details):
<!--
    mocha

Concise unit tests are implemented with the help of
[fountains](https://pypi.org/project/fountains/) and new reference bit
lists for these tests can be generated in the following way:-->

    npm test

Style conventions are enforced using [ESLint](https://eslint.org/):

```shell
eslint src test/bcl.test.ts
# -OR-
npm run-script lint
```

Contributions
-------------

In order to contribute to the source code, open an issue or submit a
pull request on the GitHub page for this library.  Remember to run 
`npm run-script lint` on any proposed code changes.

Versioning
----------

Beginning with version 0.1.0, the version number format for this library
and the changes to the library associated with version number increments
conform with [Semantic Versioning 2.0.0](https://semver.org/#semantic-versioning-200).
