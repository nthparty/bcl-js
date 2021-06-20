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

function assertRaise(expected_err: string, thunk): asserts expected_err {
    try {
        thunk();
    } catch (err) {
        if (err !== expected_err) {
            throw new Error('Assertion failed: a different error was thrown than expected.');
        }
    }
    throw new Error('Assertion failed: no error was thrown.');
}

const from_hex = BCl.Sodium.from_hex;

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
function Test_namespace() {
    function Test_API_BCl() {
        assertTrue(BCl.Sodium !== null);
        const methods = Object.getOwnPropertyNames(BCl.Sodium);
        api_methods_BCl().every(val => methods.includes(val));
    }
    function Test_API_Sodium() {
        assertTrue(BCl.Sodium !== null);
        const methods = Object.getOwnPropertyNames(BCl.Sodium);
        api_methods_sodium().every(val => methods.includes(val));
    }
    function Test_API_Symmetric() {
        const s = BCl.Symmetric.secret();
        assertTrue(typeof s.to_base64 === 'function');
        const methods = Object.getOwnPropertyNames(BCl.Symmetric);
        api_methods_symmetric().every(m => methods.includes(m));
    }
    function Test_API_Asymmetric() {
        const s = BCl.Asymmetric.secret();
        assertTrue(typeof s.to_base64 === 'function');
        const p = BCl.Asymmetric.public(s);
        assertTrue(typeof p.to_base64 === 'function');
        const methods = Object.getOwnPropertyNames(BCl.Asymmetric);
        api_methods_asymmetric().every(m => methods.includes(m));
    }
    return { Test_API_BCl, Test_API_Sodium, Test_API_Symmetric, Test_API_Asymmetric };
}


/**
 * Direct tests of primitive operators that operate on bytes-like objects.
 */
// function Test_primitives() {
//
//
//     return {
//         //
//     };
// }

/**
 * Tests of symmetric and asymmetric wrapper classes and their methods.
 */
function Test_classes() {
    function test_symmetric_encrypt_decrypt() {
        const m = new Plain(BCl.Sodium.random(1024));
        const sk = BCl.Symmetric.secret();
        const ct = BCl.Symmetric.encrypt(sk, m);
        const pt = BCl.Symmetric.decrypt(sk, ct);
        assertEqual(pt, m);
        assertTrue(pt instanceof Plain);
    }

    function test_asymmetric_encrypt_decrypt() {
        const m = new Plain(BCl.Sodium.random(1024));
        const sk = BCl.Asymmetric.secret();
        const pk = BCl.Asymmetric.public(sk);
        const ct = BCl.Asymmetric.encrypt(pk, m);
        const pt = BCl.Asymmetric.decrypt(sk, ct, pk);
        assertEqual(pt, m);
        const pt2 = BCl.Asymmetric.decrypt(sk, ct, null);
        assertEqual(pt2, m);
        assertTrue(pt instanceof Plain);
    }

    return { test_symmetric_encrypt_decrypt, test_asymmetric_encrypt_decrypt };
}

/**
 * Tests of classes used as data types.
 */
function Test_types() {
    function test_plain() {
        const x = new Plain(BCl.Sodium.random(1024));
        // assertTrue(x instanceof Raw);  // private class
        assertTrue(x instanceof Plain);
    }

    function test_secret() {
        const s = BCl.Symmetric.secret();
        // assertTrue(s instanceof Key);  // private class
        assertTrue(s instanceof Secret);
    }

    function test_public() {
        const s = BCl.Asymmetric.secret();
        // assertTrue(s instanceof Key);  // private class
        assertTrue(s instanceof Secret);

        const p = BCl.Asymmetric.public(s);
        // assertTrue(p instanceof Key);  // private class
        assertTrue(p instanceof Public);
    }

    function test_cipher() {
        const x = new Plain(BCl.Sodium.random(1024));
        const s = BCl.Symmetric.secret();
        const c = BCl.Symmetric.encrypt(s, x);
        // assertTrue(c instanceof Raw);  // private class
        assertTrue(c instanceof Cipher);
    }

    function test_secret_base64() {
        const s = BCl.Symmetric.secret();
        assertEqual(s, Secret.from_base64(s.to_base64()));
    }

    function test_public_base64() {
        const s = BCl.Asymmetric.secret();
        const p = BCl.Asymmetric.public(s);
        assertEqual(p, Public.from_base64(p.to_base64()));
    }

    function test_plain_base64() {
        const x = new Plain(BCl.Sodium.random(1024));
        assertEqual(x, Plain.from_base64(x.to_base64()));
    }

    function test_cipher_base64() {
        const x = new Plain(BCl.Sodium.random(1024));
        const s = BCl.Symmetric.secret();
        const c = BCl.Symmetric.encrypt(s, x);
        assertEqual(c, Cipher.from_base64(c.to_base64()));
    }

    return {
        test_plain, test_secret, test_cipher, test_public,
        test_secret_base64, test_public_base64,
        test_plain_base64, test_cipher_base64
    };
}

function all_tests() {
    console.log('* sodium is ready');
    const TestSuites = {
        Test_namespace,
        // Test_primitives,
        Test_classes,
        Test_types
    };
    for (const [name, init] of Object.entries(TestSuites)) {
        console.log('\nUnit test reference bit vectors for ' + name + ' methods...');
        const tests = init();
        for (const m of Object.keys(tests)) {
            const method = tests[m];
            console.log('* ' + m + ': ' + (r => r === undefined ? 'pass' : r)(method()));
        }
    }
}

console.log('Loading sodium...');
BCl.ready.then(all_tests);
