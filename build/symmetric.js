"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Symmetric_init = void 0;
const types_1 = require("./types");
/**
 * Symmetric (i.e., secret-key) encryption/decryption primitives.
 */
// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types,@typescript-eslint/no-explicit-any
function Symmetric_init(Sodium) {
    return class Symmetric {
        /**
         * Create a secret key.
         * @returns {Secret} Secret key.
         */
        static secret() {
            return new types_1.Secret(Sodium.random(32));
        }
        /**
         * Encrypt a plaintext (a bytes-like object) using the supplied secret key.
         * @param {Secret} secretKey Secret key.
         * @param {Plain} plaintext Message to encrypt.
         * @returns {Cipher} Encrypted ciphertext.
         */
        static encrypt(secretKey, plaintext) {
            const nonce = Sodium.random(24);
            const ciphertext = Sodium.secretbox(plaintext, nonce, secretKey);
            return new types_1.Cipher(new Uint8Array([...nonce, ...ciphertext]));
        }
        /**
         * Decrypt a ciphertext (a bytes-like object) using the supplied secret key.
         * @param {Secret} secretKey Secret key.
         * @param {Cipher} ciphertext Ciphertext to decrypt.
         * @returns {Plain} Decrypted plaintext.
         */
        static decrypt(secretKey, ciphertext) {
            const nonce = ciphertext.slice(0, 24);
            const plaintext = Sodium.secretboxOpen(ciphertext.slice(24), nonce, secretKey);
            return new types_1.Plain(plaintext);
        }
    };
}
exports.Symmetric_init = Symmetric_init;
