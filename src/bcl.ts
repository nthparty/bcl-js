import { Sodium } from './sodium';
import { Symmetric } from './symmetric';
import { Asymmetric } from './asymmetric';

/**
 * Wrapper class for primitive operations.
 */
export class BCl {
    public static Sodium = Sodium;
    public static Symmetric = Symmetric;
    public static Asymmetric = Asymmetric;
    public static ready: Promise<void> = Sodium.ready;
}
