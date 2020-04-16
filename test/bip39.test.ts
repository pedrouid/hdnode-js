import { hexToBuffer } from 'eccrypto-js';

import * as hdwalletJS from '../src';
import { TEST_ENTROPY, TEST_MNEMONIC } from './common';

describe('BIP39', () => {
  it('should return mnemonic from entropy', async () => {
    const mnemonic = hdwalletJS.entropyToMnemonic(hexToBuffer(TEST_ENTROPY));
    expect(mnemonic).toBeTruthy();
    expect(mnemonic === TEST_MNEMONIC).toBeTruthy();
  });

  it('should return mnemonic from entropy', async () => {
    const entropy = hdwalletJS.mnemonicToEntropy(TEST_MNEMONIC);
    expect(entropy).toBeTruthy();
    expect(entropy === TEST_ENTROPY).toBeTruthy();
  });
});
