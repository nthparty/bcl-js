/**
 * Functional and algebraic unit tests for primitives and classes.
 * Test suite containing functional unit tests for the exported primitives and
 * classes, as well as unit tests confirming algebraic relationships among primitives.
 */

import { BCl } from '../src/bcl';

// Test with BCl types
const { Secret, Public, Plain, Cipher } = BCl;

// Safe array bytes for UTF-8 serializations
const utf8 = () => BCl.Sodium.from_base64('wrbyiLax9IOPi+inpOWirXHMp0fznZqn0JTzrZ+CyoE=');

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

    test('utilities', () => {
        for (let _i = 0; _i < 128; _i++) {
            const m = BCl.Utility.random(Math.pow(2, 31) - 1);
            const n = BCl.Utility.random(m);
            const k = BCl.Utility.random(n);
            assertTrue(k < n);
            assertTrue(n < m);
            assertTrue(k < m);
        }
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

    test('secret serde', () => {
        const s = BCl.Symmetric.secret();
        assertEqual(s, Secret.from_base64(s.to_base64()));
        assertEqual(s, Secret.from_hex(s.to_hex()));
        assertEqual(utf8(), Secret.from_string((new Secret(utf8())).to_string()));
    });

    test('public serde', () => {
        const s = BCl.Asymmetric.secret();
        const p = BCl.Asymmetric.public(s);
        assertEqual(p, Public.from_base64(p.to_base64(this)));
        assertEqual(p, Public.from_hex(p.to_hex(this)));
        assertEqual(utf8(), Public.from_string((new Public(utf8())).to_string(this)));
    });

    test('plain serde', () => {
        const x = new Plain(BCl.Sodium.random(1024));
        assertEqual(x, Plain.from_base64(x.to_base64(this)));
        assertEqual(x, Plain.from_hex(x.to_hex(this)));
        assertEqual(utf8(), Plain.from_string((new Plain(utf8())).to_string(this)));
    });

    test('cipher serde', () => {
        const x = new Plain(BCl.Sodium.random(1024));
        const s = BCl.Symmetric.secret();
        const c = BCl.Symmetric.encrypt(s, x);
        assertEqual(c, Cipher.from_base64(c.to_base64(this)));
        assertEqual(c, Cipher.from_hex(c.to_hex(this)));
        assertEqual(utf8(), Cipher.from_string((new Cipher(utf8())).to_string(this)));
    });
});
