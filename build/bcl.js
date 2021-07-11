"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BCl = void 0;
const sodium_1 = require("./sodium");
const symmetric_1 = require("./symmetric");
const asymmetric_1 = require("./asymmetric");
const sodium = require('libsodium-wrappers-sumo'); // tslint:disable-line:no-var-requires
const Sodium = sodium_1.Sodium_init(sodium);
const Symmetric = symmetric_1.Symmetric_init(Sodium);
const Asymmetric = asymmetric_1.Asymmetric_init(Sodium);
/**
 * Wrapper class for primitive operations.
 */
class BCl {
}
exports.BCl = BCl;
BCl.Sodium = Sodium;
BCl.Symmetric = Symmetric;
BCl.Asymmetric = Asymmetric;
BCl.ready = Sodium.ready;
