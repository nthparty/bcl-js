import { Sodium } from "./sodium";
import { Secret, Plain, Cipher } from './types';

/**
 * Symmetric (i.e., secret-key) encryption/decryption primitives.
 */
export class Symmetric {
    /**
     * Create a secret key.
     * @returns {Secret} Secret key.
     */
    static secret(): Secret {
        return new Secret(Sodium.random(32));
    }

    /**
     * Encrypt a plaintext (a bytes-like object) using the supplied secret key.
     * @param {Secret} secretKey Secret key.
     * @param {Plain} plaintext Message to encrypt.
     * @returns {Cipher} Encrypted ciphertext.
     */
    static encrypt(secretKey: Secret, plaintext: Plain): Cipher {
        const nonce = Sodium.random(24);
        const ciphertext = Sodium.secretbox(plaintext, nonce, secretKey);
        return new Cipher(new Uint8Array([...nonce, ...ciphertext]));
    }

    /**
     * Decrypt a ciphertext (a bytes-like object) using the supplied secret key.
     * @param {Secret} secretKey Secret key.
     * @param {Cipher} ciphertext Ciphertext to decrypt.
     * @returns {Plain} Decrypted plaintext.
     */
    static decrypt(secretKey: Secret, ciphertext: Cipher): Plain {
        const nonce = ciphertext.slice(0, 24);
        const plaintext = Sodium.secretboxOpen(ciphertext.slice(24), nonce, secretKey);
        return new Plain(plaintext);
    }
}