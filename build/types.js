"use strict";
// tslint:disable:max-classes-per-file
Object.defineProperty(exports, "__esModule", { value: true });
exports.Types_init = void 0;
/**
 * Classes for data types.
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any,@typescript-eslint/explicit-module-boundary-types
function Types_init(Sodium) {
    /**
     * Wrapper class for a raw bytes-like object that represents a key,
     * plaintext, or ciphertext.
     */
    class Raw extends Uint8Array {
        constructor(bytes) {
            super(bytes);
        }
        /**
         * Construct a raw value from its Base64 UTF-8 string representation.
         */
        static from_base64(s) {
            return new Raw(Sodium.from_base64(s));
        }
        /**
         * Convert a raw value to its Base64 UTF-8 string representation.
         */
        to_base64() {
            return Sodium.to_base64(this);
        }
        /**
         * Construct a raw value from its hexadecimal UTF-8 string representation.
         */
        static from_hex(s) {
            return new Raw(Sodium.from_hex(s));
        }
        /**
         * Convert a raw value to its hexadecimal UTF-8 string representation.
         */
        to_hex() {
            return Sodium.to_hex(this);
        }
        /**
         * Construct a raw value from its UTF-8 string representation.
         */
        static from_string(s) {
            return new Raw(Sodium.from_string(s));
        }
        /**
         * Convert a raw value to its UTF-8 string representation.
         */
        to_string() {
            return Sodium.to_string(this);
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
    /**
     * Wrapper export class for a bytes-like object that represents a public key.
     */
    class Public extends Key {
        constructor(key) {
            super(new Key(new Raw(key)));
        }
    }
    /**
     * Wrapper export class for a bytes-like object that represents a plaintext.
     */
    class Plain extends Raw {
        constructor(raw) {
            super(raw);
        }
    }
    /**
     * Wrapper export class for a bytes-like object that represents a ciphertext.
     */
    class Cipher extends Raw {
        constructor(raw) {
            super(raw);
        }
    }
    return { Secret, Public, Plain, Cipher };
}
exports.Types_init = Types_init;
