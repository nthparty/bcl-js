/**
 * Wrapper classes for primitives.
 */
/**
 * Wrapper class for a raw bytes-like object that represents a key,
 * plaintext, or ciphertext.
 */
declare class Raw extends Uint8Array {
    constructor(bytes: Uint8Array);
    /**
     * Convert Base64 UTF-8 string representation of a raw value.
     */
    static from_base64(s: string): Raw;
    /**
     * Convert a raw value to its Base64 UTF-8 string representation.
     */
    to_base64(this: Raw): string;
}
/**
 * Wrapper export class for a bytes-like object that represents a key.
 */
declare class Key extends Raw {
    constructor(raw: Raw);
}
/**
 * Wrapper export class for a bytes-like object that represents a secret key.
 */
export declare class Secret extends Key {
    constructor(key: Uint8Array);
}
/**
 * Wrapper export class for a bytes-like object that represents a public key.
 */
export declare class Public extends Key {
    constructor(key: Uint8Array);
}
/**
 * Wrapper export class for a bytes-like object that represents a plaintext.
 */
export declare class Plain extends Raw {
    constructor(raw: Raw | Uint8Array);
}
/**
 * Wrapper export class for a bytes-like object that represents a ciphertext.
 */
export declare class Cipher extends Raw {
    constructor(raw: Raw | Uint8Array);
}
export {};
