import { Sodium_init } from './sodium';
import { Symmetric_init } from './symmetric';
import { Asymmetric_init } from './asymmetric';

const sodium = require('libsodium-wrappers-sumo');  // tslint:disable-line:no-var-requires
const Sodium = Sodium_init(sodium);
const Symmetric = Symmetric_init(Sodium);
const Asymmetric = Asymmetric_init(Sodium);

/**
 * Wrapper class for primitive operations.
 */
export class BCl {
    public static Sodium = Sodium;
    public static Symmetric = Symmetric;
    public static Asymmetric = Asymmetric;
    public static ready: Promise<void> = Sodium.ready;
}
