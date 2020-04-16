import { randomBytes, bufferToHex } from 'eccrypto-js';

import HDKey from './lib/hdkey';
import { entropyToMnemonic } from './lib/bip39';
import { LENGTH_16, ERROR_PUBLIC_KEY_ONLY } from './helpers';

export class HDNode {
  public static createRandom(): HDNode {
    const entropy = entropyToMnemonic(randomBytes(LENGTH_16));
    return new HDNode(new HDKey().fromMasterSeed(entropy));
  }

  public static fromMasterSeed(seedPhrase: string): HDNode {
    return new HDNode(new HDKey().fromMasterSeed(seedPhrase));
  }

  public static fromExtendedKey(base58Key: string): HDNode {
    return new HDNode(new HDKey().fromExtendedKey(base58Key));
  }

  constructor(private readonly hdKey: HDKey) {}

  get xpub(): string {
    const xpub = this.publicExtendedKey();
    return xpub;
  }

  get xpriv(): string {
    const xpriv = this.privateExtendedKey();
    return xpriv;
  }

  get publicKey(): string {
    return bufferToHex(this.hdKey.publicKey, true);
  }

  get privateKey(): string {
    this.assertPrivateExtendedKey();
    return bufferToHex(this.hdKey.privateKey, true);
  }

  public assertPrivateExtendedKey(): void {
    if (!this.hdKey.privateExtendedKey) {
      throw new Error(ERROR_PUBLIC_KEY_ONLY);
    }
  }

  public privateExtendedKey(): string {
    this.assertPrivateExtendedKey();
    return this.hdKey.privateExtendedKey;
  }

  public publicExtendedKey(): string {
    return this.hdKey.publicExtendedKey;
  }

  public derivePath(path: string): HDNode {
    return new HDNode(this.hdKey.derive(path));
  }

  public deriveChild(index: number): HDNode {
    return new HDNode(this.hdKey.deriveChild(index));
  }
}
