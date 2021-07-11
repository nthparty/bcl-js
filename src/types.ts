// tslint:disable:max-classes-per-file
// tslint:disable-next-line:no-var-requires
const { Buffer } = require('buffer/');

/**
 * Wrapper classes for primitives.
 */

/**
 * Wrapper class for a raw bytes-like object that represents a key,
 * plaintext, or ciphertext.
 */
class Raw extends Uint8Array {
    constructor(bytes: Uint8Array) {
        super(bytes);
    }

    /**
     * Convert Base64 UTF-8 string representation of a raw value.
     */
    static from_base64(s: string): Raw {
        return new Raw(Buffer.from(s, 'base64'));
    }

    /**
     * Convert a raw value to its Base64 UTF-8 string representation.
     */
    to_base64(this: Raw): string {
        return Buffer.from(this).toString('base64');
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
export class Secret extends Key {
    constructor(key: Uint8Array) {
        super(new Key(new Raw(key)));
    }
}

/**
 * Wrapper export class for a bytes-like object that represents a public key.
 */
export class Public extends Key {
    constructor(key: Uint8Array) {
        super(new Key(new Raw(key)));
    }
}

/**
 * Wrapper export class for a bytes-like object that represents a plaintext.
 */
export class Plain extends Raw {
    constructor(raw: Raw | Uint8Array) {
        super(raw);
    }
}

/**
 * Wrapper export class for a bytes-like object that represents a ciphertext.
 */
export class Cipher extends Raw {
    constructor(raw: Raw | Uint8Array) {
        super(raw);
    }
}
