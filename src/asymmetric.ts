/**
 * Asymmetric (i.e., public-key) encryption/decryption primitives.
 */
// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types,@typescript-eslint/no-explicit-any
export function Asymmetric_init(Sodium: any, Types: any): any { const { Secret, Public, Plain, Cipher } = Types; return class Asymmetric {

    /**
     * Create a secret key.
     * @returns {Secret} Secret key.
     */
    static secret(): typeof Secret {
        return new Secret(Sodium.random(32));
    }

    /**
     * Create a public key using a secret key (a bytes-like object of length 32).
     * @param {Secret} secretKey Secret key.
     * @returns {Public} Corresponding public key.
     */
    static public(secretKey: typeof Secret): typeof Public {
        return new Public(Sodium.scalarmultBase(secretKey));
    }

    /**
     * Encrypt a plaintext (a bytes-like object) using the supplied public key.
     * @param {Public} publicKey Recipient's public key.
     * @param {Plain} plaintext Message to encrypt.
     * @returns {Cipher} Encrypted ciphertext.
     */
    static encrypt(publicKey: typeof Public, plaintext: typeof Plain): typeof Cipher {
        return new Cipher(Sodium.boxSeal(plaintext, publicKey));
    }

    /**
     * Decrypt a ciphertext (a bytes-like object) using the supplied secret key.
     * @param {Secret} secretKey Recipient's secret key.
     * @param {Cipher} ciphertext Ciphertext to decrypt.
     * @param {Public} publicKey Recipient's public key.
     * @returns {Plain} Decrypted plaintext.
     */
    static decrypt(secretKey: typeof Secret, ciphertext: typeof Cipher, publicKey: typeof Public): typeof Plain {
        return new Plain(Sodium.boxSealOpen(
            ciphertext, publicKey ?? this.public(secretKey), secretKey
        ));
    }
}; }
