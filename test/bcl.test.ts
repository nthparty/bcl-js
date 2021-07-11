/**
 * Functional and algebraic unit tests for primitives and classes.
 * Test suite containing functional unit tests for the exported primitives and
 * classes, as well as unit tests confirming algebraic relationships among primitives.
 */

import { BCl } from "../src/bcl";
import { Secret, Public, Plain, Cipher } from '../src/types';

function assertTrue(condition: boolean): asserts condition {
    if (condition !== true) {
        throw new Error('Assertion failed.');
    }
}

function assertEqual(bytes1: Uint8Array, bytes2: Uint8Array): asserts bytes1 {
    if (BCl.Sodium.compare(bytes1, bytes2) !== 0) {
        throw new Error('Assertion failed: the byte arrays are not equal.');
    }
}

/**
 * API symbols that should be available to users upon module import.
 */
function api_methods_BCl() {
    return ['Sodium', 'Symmetric', 'Asymmetric'];
}
function api_methods_sodium() {
    return [
        'random', 'to_hex', 'from_hex',
        'boxSeal',
        'boxSealOpen',
        'secretbox',
        'secretboxOpen',
        'scalarmultBase'
    ];
}
function api_methods_symmetric() {
    return ['secret', 'encrypt', 'decrypt'];
}
function api_methods_asymmetric() {
    return ['public', 'secret', 'encrypt', 'decrypt'];
}

/**
 * Check that namespaces provide access to the expected
 * classes and functions.
 */
beforeEach((done) => {
    BCl.Sodium.ready.then(done);
});

describe('namespace', () => {
    test('bcl api has all methods', () => {
        assertTrue(BCl.Sodium !== null);
        const methods = Object.getOwnPropertyNames(BCl);
        assertTrue(api_methods_BCl().every(val => methods.includes(val)));
        assertEqual(BCl.Sodium.from_hex('8badf00d'), new Uint8Array([139, 173, 240, 13]));
        assertTrue(BCl.Sodium.to_hex(BCl.Sodium.from_hex('8badf00d')) === '8badf00d');
    });

    test('sodium api has all methods', () => {
        assertTrue(BCl.Sodium !== null);
        const methods = Object.getOwnPropertyNames(BCl.Sodium);
        assertTrue(api_methods_sodium().every(val => methods.includes(val)));
    });

    test('symmetric api has all methods', () => {
        const s = BCl.Symmetric.secret();
        assertTrue(typeof s.to_base64 === 'function');
        const methods = Object.getOwnPropertyNames(BCl.Symmetric);
        assertTrue(api_methods_symmetric().every(m => methods.includes(m)));
    });

    test('asymmetric api has all methods', () => {
        const s = BCl.Asymmetric.secret();
        assertTrue(typeof s.to_base64 === 'function');
        const p = BCl.Asymmetric.public(s);
        assertTrue(typeof p.to_base64 === 'function');
        const methods = Object.getOwnPropertyNames(BCl.Asymmetric);
        assertTrue(api_methods_asymmetric().every(m => methods.includes(m)));
    });
});


/**
 * Direct tests of primitive operators that operate on bytes-like objects.
 */
// describe('primitives', () => {
//
//
// });

/**
 * Tests of symmetric and asymmetric wrapper classes and their methods.
 */
describe('classes', () => {
    test('symmetric encrypt and decrypt', () => {
        const m = new Plain(BCl.Sodium.random(1024));
        const sk = BCl.Symmetric.secret();
        const ct = BCl.Symmetric.encrypt(sk, m);
        const pt = BCl.Symmetric.decrypt(sk, ct);
        assertEqual(pt, m);
        assertTrue(pt instanceof Plain);
    });

    test('asymmetric encrypt and decrypt', () => {
        const m = new Plain(BCl.Sodium.random(1024));
        const sk = BCl.Asymmetric.secret();
        const pk = BCl.Asymmetric.public(sk);
        const ct = BCl.Asymmetric.encrypt(pk, m);
        const pt = BCl.Asymmetric.decrypt(sk, ct, pk);
        assertEqual(pt, m);
        const pt2 = BCl.Asymmetric.decrypt(sk, ct, null);
        assertEqual(pt2, m);
        assertTrue(pt instanceof Plain);
    });
});

/**
 * Tests of classes used as data types.
 */
describe('types', () => {
    test('plain', () => {
        const x = new Plain(BCl.Sodium.random(1024));
        // assertTrue(x instanceof Raw);  // private class
        assertTrue(x instanceof Plain);
    });

    test('secret', () => {
        const s = BCl.Symmetric.secret();
        // assertTrue(s instanceof Key);  // private class
        assertTrue(s instanceof Secret);
    });

    test('public', () => {
        const s = BCl.Asymmetric.secret();
        // assertTrue(s instanceof Key);  // private class
        assertTrue(s instanceof Secret);

        const p = BCl.Asymmetric.public(s);
        // assertTrue(p instanceof Key);  // private class
        assertTrue(p instanceof Public);
    });

    test('cipher', () => {
        const x = new Plain(BCl.Sodium.random(1024));
        const s = BCl.Symmetric.secret();
        const c = BCl.Symmetric.encrypt(s, x);
        // assertTrue(c instanceof Raw);  // private class
        assertTrue(c instanceof Cipher);
    });

    test('secret base64', () => {
        const s = BCl.Symmetric.secret();
        assertEqual(s, Secret.from_base64(s.to_base64()));
    });

    test('public base64', () => {
        const s = BCl.Asymmetric.secret();
        const p = BCl.Asymmetric.public(s);
        assertEqual(p, Public.from_base64(p.to_base64()));
    });

    test('plain base64', () => {
        const x = new Plain(BCl.Sodium.random(1024));
        assertEqual(x, Plain.from_base64(x.to_base64()));
    });

    test('cipher base64', () => {
        const x = new Plain(BCl.Sodium.random(1024));
        const s = BCl.Symmetric.secret();
        const c = BCl.Symmetric.encrypt(s, x);
        assertEqual(c, Cipher.from_base64(c.to_base64()));
    });
});
