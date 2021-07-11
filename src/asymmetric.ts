import { Secret, Public, Plain, Cipher } from './types';

/**
 * Asymmetric (i.e., public-key) encryption/decryption primitives.
 */
// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types,@typescript-eslint/no-explicit-any
export function Asymmetric_init(Sodium: any): any { return class Asymmetric {

    /**
     * Create a secret key.
     * @returns {Secret} Secret key.
     */
    static secret(): Secret {
        return new Secret(Sodium.random(32));
    }

    /**
     * Create a public key using a secret key (a bytes-like object of length 32).
     * @param {Secret} secretKey Secret key.
     * @returns {Public} Corresponding public key.
     */
    static public(secretKey: Secret): Public {
        return new Public(Sodium.scalarmultBase(secretKey));
    }

    /**
     * Encrypt a plaintext (a bytes-like object) using the supplied public key.
     * @param {Public} publicKey Recipient's public key.
     * @param {Plain} plaintext Message to encrypt.
     * @returns {Cipher} Encrypted ciphertext.
     */
    static encrypt(publicKey: Public, plaintext: Plain): Cipher {
        return new Cipher(Sodium.boxSeal(plaintext, publicKey));
    }

    /**
     * Decrypt a ciphertext (a bytes-like object) using the supplied secret key.
     * @param {Secret} secretKey Recipient's secret key.
     * @param {Cipher} ciphertext Ciphertext to decrypt.
     * @param {Public} publicKey Recipient's public key.
     * @returns {Plain} Decrypted plaintext.
     */
    static decrypt(secretKey: Secret, ciphertext: Cipher, publicKey: Public): Plain {
        return new Plain(Sodium.boxSealOpen(
            ciphertext, publicKey ?? this.public(secretKey), secretKey
        ));
    }
}; }
