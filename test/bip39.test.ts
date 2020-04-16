import { hexToBuffer } from 'eccrypto-js';

import * as hdnodeJS from '../src';
import { TEST_ENTROPY, TEST_MNEMONIC } from './common';

describe('BIP39', () => {
  it('should return mnemonic from entropy', async () => {
    const mnemonic = hdnodeJS.entropyToMnemonic(hexToBuffer(TEST_ENTROPY));
    expect(mnemonic).toBeTruthy();
    expect(mnemonic === TEST_MNEMONIC).toBeTruthy();
  });

  it('should return mnemonic from entropy', async () => {
    const entropy = hdnodeJS.mnemonicToEntropy(TEST_MNEMONIC);
    expect(entropy).toBeTruthy();
    expect(entropy === TEST_ENTROPY).toBeTruthy();
  });
});
