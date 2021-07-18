"use strict";
/**
 * Functional and algebraic unit tests for primitives and classes.
 * Test suite containing functional unit tests for the exported primitives and
 * classes, as well as unit tests confirming algebraic relationships among primitives.
 */
var __values = (this && this.__values) || function(o) {
    var s = typeof Symbol === "function" && Symbol.iterator, m = s && o[s], i = 0;
    if (m) return m.call(o);
    if (o && typeof o.length === "number") return {
        next: function () {
            if (o && i >= o.length) o = void 0;
            return { value: o && o[i++], done: !o };
        }
    };
    throw new TypeError(s ? "Object is not iterable." : "Symbol.iterator is not defined.");
};
var __read = (this && this.__read) || function (o, n) {
    var m = typeof Symbol === "function" && o[Symbol.iterator];
    if (!m) return o;
    var i = m.call(o), r, ar = [], e;
    try {
        while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);
    }
    catch (error) { e = { error: error }; }
    finally {
        try {
            if (r && !r.done && (m = i["return"])) m.call(i);
        }
        finally { if (e) throw e.error; }
    }
    return ar;
};
// exports.__esModule = true;
// var BCl = require("../dist/bcl.js");
function assertTrue(condition) {
    if (condition !== true) {
        throw new Error('Assertion failed.');
    }
}
function assertEqual(bytes1, bytes2) {
    if (BCl.Sodium.compare(bytes1, bytes2) !== 0) {
        throw new Error('Assertion failed: the byte arrays are not equal.');
    }
}
function assertRaise(expected_err, thunk) {
    try {
        thunk();
    }
    catch (err) {
        if (err !== expected_err) {
            throw new Error('Assertion failed: a different error was thrown than expected.');
        }
    }
    throw new Error('Assertion failed: no error was thrown.');
}
var from_hex = BCl.Sodium.from_hex;
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
        var methods = Object.getOwnPropertyNames(BCl.Sodium);
        api_methods_BCl().every(function (val) { return methods.includes(val); });
    }
    function Test_API_Sodium() {
        assertTrue(BCl.Sodium !== null);
        var methods = Object.getOwnPropertyNames(BCl.Sodium);
        api_methods_sodium().every(function (val) { return methods.includes(val); });
    }
    function Test_API_Symmetric() {
        var s = BCl.Symmetric.secret();
        assertTrue(typeof s.to_base64 === 'function');
        var methods = Object.getOwnPropertyNames(BCl.Symmetric);
        api_methods_symmetric().every(function (m) { return methods.includes(m); });
    }
    function Test_API_Asymmetric() {
        var s = BCl.Asymmetric.secret();
        assertTrue(typeof s.to_base64 === 'function');
        var p = BCl.Asymmetric.public(s);
        assertTrue(typeof p.to_base64 === 'function');
        var methods = Object.getOwnPropertyNames(BCl.Asymmetric);
        api_methods_asymmetric().every(function (m) { return methods.includes(m); });
    }
    return { Test_API_BCl: Test_API_BCl, Test_API_Sodium: Test_API_Sodium, Test_API_Symmetric: Test_API_Symmetric, Test_API_Asymmetric: Test_API_Asymmetric };
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
        var m = BCl.Sodium.random(1024);
        var sk = BCl.Symmetric.secret();
        var ct = BCl.Symmetric.encrypt(sk, m);
        var pt = BCl.Symmetric.decrypt(sk, ct);
        assertEqual(pt, m);
    }
    function test_asymmetric_encrypt_decrypt() {
        var m = BCl.Sodium.random(1024);
        var sk = BCl.Asymmetric.secret();
        var pk = BCl.Asymmetric.public(sk);
        var ct = BCl.Asymmetric.encrypt(pk, m);
        var pt = BCl.Asymmetric.decrypt(sk, ct, pk);
        assertEqual(pt, m);
        var pt2 = BCl.Asymmetric.decrypt(sk, ct, null);
        assertEqual(pt2, m);
    }
    return { test_symmetric_encrypt_decrypt: test_symmetric_encrypt_decrypt, test_asymmetric_encrypt_decrypt: test_asymmetric_encrypt_decrypt };
}
/**
 * Tests of classes used as data types.
 */
function Test_types() {
    function test_plain() {
        var x = BCl.Sodium.random(1024);
        assertTrue(x instanceof Uint8Array);
    }
    function test_secret() {
        var s = BCl.Symmetric.secret();
        assertTrue(s instanceof BCl.Secret);
    }
    function test_public() {
        var s = BCl.Asymmetric.secret();
        assertTrue(s instanceof BCl.Secret);
        var p = BCl.Asymmetric.public(s);
        assertTrue(p instanceof BCl.Public);
    }
    function test_cipher() {
        var x = BCl.Sodium.random(1024);
        var s = BCl.Symmetric.secret();
        var c = BCl.Symmetric.encrypt(s, x);
        assertTrue(c instanceof BCl.Cipher);
    }
    function test_secret_base64() {
        var s = BCl.Symmetric.secret();
        assertEqual(s, BCl.Secret.from_base64(s.to_base64(this)));
    }
    function test_public_base64() {
        var s = BCl.Asymmetric.secret();
        var p = BCl.Asymmetric.public(s);
        assertEqual(p, BCl.Public.from_base64(p.to_base64(this)));
    }
    function test_plain_base64() {
        var x = BCl.Sodium.random(1024);
        assertEqual(x, BCl.Plain.from_base64(new BCl.Plain(x).to_base64(this)));
    }
    function test_cipher_base64() {
        var x = BCl.Sodium.random(1024);
        var s = BCl.Symmetric.secret();
        var c = BCl.Symmetric.encrypt(s, x);
        assertEqual(c, BCl.Cipher.from_base64(c.to_base64(this)));
    }
    return {
        test_plain: test_plain,
        test_secret: test_secret,
        test_cipher: test_cipher,
        test_public: test_public,
        test_secret_base64: test_secret_base64,
        test_public_base64: test_public_base64,
        test_plain_base64: test_plain_base64,
        test_cipher_base64: test_cipher_base64
    };
}
function all_tests() {
    var e_1, _a, e_2, _b;
    window.display('* sodium is ready');
    var TestSuites = {
        Test_namespace: Test_namespace,
        // Test_primitives,
        Test_classes: Test_classes,
        Test_types: Test_types
    };
    try {
        for (var _c = __values(Object.entries(TestSuites)), _d = _c.next(); !_d.done; _d = _c.next()) {
            var _e = __read(_d.value, 2), name_1 = _e[0], init = _e[1];
            window.display('\nUnit test reference bit vectors for ' + name_1 + ' methods...');
            var tests = init();
            try {
                for (var _f = (e_2 = void 0, __values(Object.keys(tests))), _g = _f.next(); !_g.done; _g = _f.next()) {
                    var m = _g.value;
                    var method = tests[m];
                    window.display('* ' + m + ': ' + (function (r) { return r === undefined ? 'pass' : r; })(method()));
                }
            }
            catch (e_2_1) { e_2 = { error: e_2_1 }; }
            finally {
                try {
                    if (_g && !_g.done && (_b = _f["return"])) _b.call(_f);
                }
                finally { if (e_2) throw e_2.error; }
            }
        }
    }
    catch (e_1_1) { e_1 = { error: e_1_1 }; }
    finally {
        try {
            if (_d && !_d.done && (_a = _c["return"])) _a.call(_c);
        }
        finally { if (e_1) throw e_1.error; }
    }
}
window.display('Loading sodium...');
BCl.ready.then(all_tests);
