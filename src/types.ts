// tslint:disable:max-classes-per-file

/**
 * Classes for data types.
 */

// eslint-disable-next-line @typescript-eslint/no-explicit-any,@typescript-eslint/explicit-module-boundary-types
export function Types_init(Sodium: any): { 'Public': any, 'Secret': any, 'Plain': any, 'Cipher': any } {
    /**
     * Wrapper class for a raw bytes-like object that represents a key,
     * plaintext, or ciphertext.
     */
    class Raw extends Uint8Array {
        constructor(bytes: Uint8Array) {
            super(bytes);
        }

        /**
         * Construct a raw value from its Base64 UTF-8 string representation.
         */
        static from_base64(s: string): Raw {
            return new Raw(Sodium.from_base64(s));
        }

        /**
         * Convert a raw value to its Base64 UTF-8 string representation.
         */
        to_base64(this: Raw): string {
            return Sodium.to_base64(this);
        }

        /**
         * Construct a raw value from its hexadecimal UTF-8 string representation.
         */
        static from_hex(s: string): Raw {
            return new Raw(Sodium.from_hex(s));
        }

        /**
         * Convert a raw value to its hexadecimal UTF-8 string representation.
         */
        to_hex(this: Raw): string {
            return Sodium.to_hex(this);
        }
    }

    /**
     * Wrapper export class for a bytes-like object that represents a key.
     */
    class Key extends Raw {
        constructor(raw: Raw) {
            super(raw);
        }
    }

    /**
     * Wrapper export class for a bytes-like object that represents a secret key.
     */
    class Secret extends Key {
        constructor(key: Uint8Array) {
            super(new Key(new Raw(key)));
        }
    }

    /**
     * Wrapper export class for a bytes-like object that represents a public key.
     */
    class Public extends Key {
        constructor(key: Uint8Array) {
            super(new Key(new Raw(key)));
        }
    }

    /**
     * Wrapper export class for a bytes-like object that represents a plaintext.
     */
    class Plain extends Raw {
        constructor(raw: Raw | Uint8Array) {
            super(raw);
        }
    }

    /**
     * Wrapper export class for a bytes-like object that represents a ciphertext.
     */
    class Cipher extends Raw {
        constructor(raw: Raw | Uint8Array) {
            super(raw);
        }
    }

    return { Secret, Public, Plain, Cipher };
}
