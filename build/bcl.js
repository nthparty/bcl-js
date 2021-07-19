"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BCl = void 0;
const sodium_1 = require("./sodium");
const types_1 = require("./types");
const symmetric_1 = require("./symmetric");
const asymmetric_1 = require("./asymmetric");
const sodium = require('libsodium-wrappers-sumo'); // tslint:disable-line:no-var-requires
const Sodium = sodium_1.Sodium_init(sodium);
const Utility = { random: Sodium.randombytes_uniform };
const Types = types_1.Types_init(Sodium);
const { Secret, Public, Plain, Cipher } = Types;
const Symmetric = symmetric_1.Symmetric_init(Sodium, Types);
const Asymmetric = asymmetric_1.Asymmetric_init(Sodium, Types);
/**
 * Wrapper class for primitive operations.
 */
class BCl {
}
exports.BCl = BCl;
BCl.Sodium = Sodium;
BCl.Utility = Utility;
BCl.Symmetric = Symmetric;
BCl.Asymmetric = Asymmetric;
BCl.Secret = Secret;
BCl.Public = Public;
BCl.Plain = Plain;
BCl.Cipher = Cipher;
BCl.ready = Sodium.ready;
