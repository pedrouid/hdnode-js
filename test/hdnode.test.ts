import * as hdnodeJS from '../src';
import {
  TEST_MNEMONIC,
  TEST_XPUB,
  TEST_PUBLIC_KEY,
  TEST_XPRIV,
  TEST_PRIVATE_KEY,
  TEST_ERROR_MSG,
} from './common/';

describe('HDNode', () => {
  it('should create from random an HDNode succesfully', async () => {
    const hdNode = hdnodeJS.HDNode.createRandom();
    expect(hdNode).toBeTruthy();
  });

  it('should create from extended key HDNode succesfully', async () => {
    const hdNode = hdnodeJS.HDNode.fromMasterSeed(TEST_MNEMONIC);
    expect(hdNode).toBeTruthy();
    expect(hdNode.xpub).toEqual(TEST_XPUB);
    expect(hdNode.publicKey).toEqual(TEST_PUBLIC_KEY);
    expect(hdNode.xpriv).toEqual(TEST_XPRIV);
    expect(hdNode.privateKey).toEqual(TEST_PRIVATE_KEY);
  });

  it('should create from extended key HDNode succesfully', async () => {
    const hdNode = hdnodeJS.HDNode.fromExtendedKey(TEST_XPUB);
    expect(hdNode).toBeTruthy();
    expect(hdNode.xpub).toEqual(TEST_XPUB);
    expect(hdNode.publicKey).toEqual(TEST_PUBLIC_KEY);
    expect(() => hdNode.xpriv).toThrow(TEST_ERROR_MSG);
    expect(() => hdNode.privateKey).toThrow(TEST_ERROR_MSG);
  });
});
