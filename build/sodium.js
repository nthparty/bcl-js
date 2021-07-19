"use strict";
/**
 * Wrapper class for primitive operations.
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.Sodium_init = void 0;
// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types,@typescript-eslint/no-explicit-any
function Sodium_init(sodium) {
    var _a;
    return _a = class Sodium {
            /**
             * Return random non-zero scalar.
             * @param {number} l Number of random bytes to generate.
             * @returns {Uint8Array} Random byte array of length l.
             */
            static random(l) {
                return sodium.randombytes_buf(l);
            }
            /**
             * Return the hexadecimal representation of a byte array.
             * @param {Uint8Array} bytes Byte array of any length.
             * @returns {string} Hexadecimal number formatted as a UTF-8 string.
             */
            static to_hex(bytes) {
                return sodium.to_hex(bytes);
            }
            /**
             * Return a new byte array from its representation in hexadecimal.
             * @param {string} hex UTF-8 string of even length to convert.
             * @returns {Uint8Array} Byte array corresponding to the hexadecimal number.
             */
            static from_hex(hex) {
                return sodium.from_hex(hex);
            }
            /**
             * Return the Base64 encoding of a byte array.
             * @param {Uint8Array} bytes Byte array of any length.
             * @returns {string} Base64 UTF-8 string representation of the bytes.
             */
            static to_base64(bytes) {
                return sodium.to_base64(bytes, 1);
            }
            /**
             * Return a new byte array from its representation in Base64.
             * @param {string} s Base64 UTF-8 string representation of the bytes.
             * @returns {Uint8Array} Byte array corresponding to the Base64 encoding.
             */
            static from_base64(s) {
                return sodium.from_base64(s, 1);
            }
            /**
             * Return the UTF-8 string encoding of a byte array.
             * @param {Uint8Array} bytes Byte array of any length.
             * @returns {string} UTF-8 string representation of the bytes.
             */
            static to_string(bytes) {
                return sodium.to_string(bytes);
            }
            /**
             * Return a new byte array from a UTF-8 string.
             * @param {string} s UTF-8 string representation of the bytes.
             * @returns {Uint8Array} Byte array corresponding to the UTF-8 standard.
             */
            static from_string(s) {
                return sodium.from_string(s);
            }
            /**
             * Return -1, 0 or -1 depending on whether the bytes1 is less than,
             * equal or greater than bytes2.
             * @param {Uint8Array} bytes1 Byte array of any length.
             * @param {Uint8Array} bytes2 Byte array of same(?) length.
             * @returns {number} Comparison symbol.  Either -1, 0 or -1.
             */
            static compare(bytes1, bytes2) {
                return sodium.compare(bytes1, bytes2);
            }
            /**
             * Return a random 32-bit unsigned integer below an upper bound.
             * @param {number} upper_bound Upper bound (exclusive, no greater than 2^31-1).
             * @returns {number} Random whole number less than `upper_bound`.
             */
            static randombytes_uniform(upper_bound) {
                return sodium.randombytes_uniform(upper_bound);
            }
        },
        // Aliases
        _a.boxSeal = (m, pk) => sodium.crypto_box_seal(m, pk),
        _a.boxSealOpen = (ct, pk, sk) => sodium.crypto_box_seal_open(ct, pk, sk),
        _a.secretbox = (m, iv, k) => sodium.crypto_secretbox_easy(m, iv, k),
        _a.secretboxOpen = (ct, iv, k) => sodium.crypto_secretbox_open_easy(ct, iv, k),
        _a.scalarmultBase = (sk) => sodium.crypto_scalarmult_base(sk),
        // Promise will be resolved when the sodium library is finished initializing.
        _a.ready = new Promise(resolve => {
            sodium.ready.then(() => {
                // Optional setup hook
                resolve();
            });
        }),
        _a;
}
exports.Sodium_init = Sodium_init;
