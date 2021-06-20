# bcl-js
TypeScript library that provides a simple interface for symmetric (i.e., symmetric-key) and asymmetric (i.e., asymmetric-key) encryption/decryption primitives.

Purpose
-------

This library provides simple and straightforward methods for symmetric (i.e., symmetric-key) and asymmetric (i.e., asymmetric-key) cryptographic encryption and decryption capabilities. The library's interface is designed for ease of use and therefore hides from users some of the flexibilities and performance trade-offs that can be leveraged via direct use of the underlying libraries.

The library's name is a reference to `Boron trichloride <https://en.wikipedia.org/wiki/Boron_trichloride>`_, as it is a wrapper for a limited set of capabilities found in `PyNaCl <https://pypi.org/project/PyNaCl/>`_ (which is itself a wrapper library for `libsodium <https://doc.libsodium.org/>`_). However, it can also be an acronym for *basic cryptographic library*.

<!--
Package Installation and Usage
------------------------------

The package is available on PyPI:

    npm install bcl

The library can be imported in the usual ways:

    import bcl
    from bcl import *
-->

Testing<!-- and Conventions-->
-----------------------

<!--All unit tests are executed and their coverage is measured when using
[mocha](https://mochajs.org/) (see `setup.cfg` for configution
details):

    mocha

Concise unit tests are implemented with the help of
[fountains](https://pypi.org/project/fountains/) and new reference bit
lists for these tests can be generated in the following way:-->

    ts-node test/test_bcl.ts

<!--Style conventions are enforced using [Pylint](https://www.pylint.org/):

    pylint bcl test/test_bcl
-->

Contributions
-------------

In order to contribute to the source code, open an issue or submit a
pull request on the GitHub page for this library.

Versioning
----------

Beginning with version 0.1.0, the version number format for this library
and the changes to the library associated with version number increments
conform with [Semantic Versioning
2.0.0](https://semver.org/#semantic-versioning-200).