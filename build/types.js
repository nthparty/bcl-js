"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Cipher = exports.Plain = exports.Public = exports.Secret = void 0;
/**
 * Wrapper classes for primitives.
 */
/**
 * Wrapper class for a raw bytes-like object that represents a key,
 * plaintext, or ciphertext.
 */
class Raw extends Uint8Array {
    constructor(bytes) {
        super(bytes);
    }
    /**
     * Convert Base64 UTF-8 string representation of a raw value.
     */
    static from_base64(s) {
        return new Raw(Buffer.from(s, 'base64'));
    }
    /**
     * Convert a raw value to its Base64 UTF-8 string representation.
     */
    to_base64() {
        return Buffer.from(this).toString('base64');
    }
}
/**
 * Wrapper export class for a bytes-like object that represents a key.
 */
class Key extends Raw {
    constructor(raw) {
        super(raw);
    }
}
/**
 * Wrapper export class for a bytes-like object that represents a secret key.
 */
class Secret extends Key {
    constructor(key) {
        super(new Key(new Raw(key)));
    }
}
exports.Secret = Secret;
/**
 * Wrapper export class for a bytes-like object that represents a public key.
 */
class Public extends Key {
    constructor(key) {
        super(new Key(new Raw(key)));
    }
}
exports.Public = Public;
/**
 * Wrapper export class for a bytes-like object that represents a plaintext.
 */
class Plain extends Raw {
    constructor(raw) {
        super(raw);
    }
}
exports.Plain = Plain;
/**
 * Wrapper export class for a bytes-like object that represents a ciphertext.
 */
class Cipher extends Raw {
    constructor(raw) {
        super(raw);
    }
}
exports.Cipher = Cipher;
