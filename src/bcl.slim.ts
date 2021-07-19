import { Sodium_init } from './sodium';
import { Types_init } from './types';
import { Symmetric_init } from './symmetric';
import { Asymmetric_init } from './asymmetric';

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types,@typescript-eslint/no-explicit-any
export function BClSlim(sodium: any): any {
    const Sodium = Sodium_init(sodium);
    const Types = Types_init(Sodium);
    const Symmetric = Symmetric_init(Sodium, Types);
    const Asymmetric = Asymmetric_init(Sodium, Types);

    /**
     * Wrapper class for primitive operations.
     */
    return class BCl {
        public static Sodium = Sodium;
        public static Utility = { random: Sodium.randombytes_uniform };
        public static Symmetric = Symmetric;
        public static Asymmetric = Asymmetric;
        public static Secret = Types.Secret;
        public static Public = Types.Public;
        public static Plain = Types.Plain;
        public static Cipher = Types.Cipher;
        public static ready: Promise<void> = Sodium.ready;
    };
}
