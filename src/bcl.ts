import { Sodium_init } from './sodium';
import { Types_init } from './types';
import { Symmetric_init } from './symmetric';
import { Asymmetric_init } from './asymmetric';

const sodium = require('libsodium-wrappers-sumo');  // tslint:disable-line:no-var-requires
const Sodium = Sodium_init(sodium);

const Types = Types_init(Sodium);
const { Secret, Public, Plain, Cipher } = Types;

const Symmetric = Symmetric_init(Sodium, Types);
const Asymmetric = Asymmetric_init(Sodium, Types);

/**
 * Wrapper class for primitive operations.
 */
export class BCl {
    public static Sodium = Sodium;
    public static Symmetric = Symmetric;
    public static Asymmetric = Asymmetric;
    public static Secret = Secret;
    public static Public = Public;
    public static Plain = Plain;
    public static Cipher = Cipher;
    public static ready: Promise<void> = Sodium.ready;
}
