import { Sodium_init } from './sodium';
import { Symmetric_init } from './symmetric';
import { Asymmetric_init } from './asymmetric';

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types,@typescript-eslint/no-explicit-any
export function BClSlim(sodium: any): any {
    const Sodium = Sodium_init(sodium);
    const Symmetric = Symmetric_init(Sodium);
    const Asymmetric = Asymmetric_init(Sodium);

    /**
     * Wrapper class for primitive operations.
     */
    return class BCl {
        public static Sodium = Sodium;
        public static Symmetric = Symmetric;
        public static Asymmetric = Asymmetric;
        public static ready: Promise<void> = Sodium.ready;
    };
}
