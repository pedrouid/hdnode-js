# hdwallet-js [![npm version](https://badge.fury.io/js/hdwallet-js.svg)](https://badge.fury.io/js/hdwallet-js)

BIP44 and BIP39 wallet library

## Description

This library is a port from [eccrypto](https://github.com/bitchan/eccrypto) it makes use of native libraries on NodeJS and Browser enviroments with pure javascript fallbacks.

## Usage

### RandomBytes

```typescript
import * as hdwalletJS from 'hdwallet-js';

const length = 32;
const key = hdwalletJS.randomBytes(length);

// key.length === length
```

### AES

```typescript
import * as hdwalletJS from 'hdwallet-js';

const key = hdwalletJS.randomBytes(32);
const iv = hdwalletJS.randomBytes(16);

const str = 'test message to encrypt';
const msg = hdwalletJS.utf8ToBuffer(str);

const ciphertext = await hdwalletJS.aesCbcEncrypt(iv, key, msg);

const decrypted = await hdwalletJS.aesCbcDecrypt(iv, key, ciphertext);

// decrypted.toString() === str
```

### HMAC

```typescript
import * as hdwalletJS from 'hdwallet-js';

const key = hdwalletJS.randomBytes(32);
const iv = hdwalletJS.randomBytes(16);

const macKey = hdwalletJS.concatBuffers(iv, key);
const dataToMac = hdwalletJS.concatBuffers(iv, key, msg);

const mac = await hdwalletJS.hmacSha256Sign(macKey, dataToMac);

const result = await hdwalletJS.hmacSha256Verify(macKey, dataToMac, mac);

// result will return true if match
```

### SHA2

```typescript
import * as hdwalletJS from 'hdwallet-js';

// SHA256
const str = 'test message to hash';
const msg = hdwalletJS.utf8ToBuffer(str);
const hash = await hdwalletJS.sha256(str);

// SHA512
const str = 'test message to hash';
const msg = hdwalletJS.utf8ToBuffer(str);
const hash = await hdwalletJS.sha512(str);
```

### SHA3

```typescript
import * as hdwalletJS from 'hdwallet-js';

// SHA3
const str = 'test message to hash';
const msg = hdwalletJS.utf8ToBuffer(str);
const hash = await hdwalletJS.sha3(str);

// KECCAK256
const str = 'test message to hash';
const msg = hdwalletJS.utf8ToBuffer(str);
const hash = await hdwalletJS.keccak256(str);
```

### ECDSA

```typescript
import * as hdwalletJS from 'hdwallet-js';

const keyPair = hdwalletJS.generateKeyPair();

const str = 'test message to hash';
const msg = hdwalletJS.utf8ToBuffer(str);
const hash = await hdwalletJS.sha256(str);

const sig = await hdwalletJS.sign(keyPair.privateKey, hash);

await hdwalletJS.verify(keyPair.publicKey, msg, sig);

// verify will throw if signature is BAD
```

### ECDH

```typescript
import * as hdwalletJS from 'hdwallet-js';

const keyPairA = hdwalletJS.generateKeyPair();
const keyPairB = hdwalletJS.generateKeyPair();

const sharedKey1 = await hdwalletJS.derive(
  keyPairA.privateKey,
  keyPairB.publicKey
);

const sharedKey2 = await hdwalletJS.derive(
  keyPairB.privateKey,
  keyPairA.publicKey
);

// sharedKey1.toString('hex') === sharedKey2.toString('hex')
```

### ECIES

```typescript
import * as hdwalletJS from 'hdwallet-js';

const keyPair = hdwalletJS.generateKeyPair();

const str = 'test message to encrypt';
const msg = hdwalletJS.utf8ToBuffer(str);

const encrypted = await hdwalletJS.encrypt(keyPairB.publicKey, msg);

const decrypted = await hdwalletJS.decrypt(keyPairB.privateKey, encrypted);

// decrypted.toString() === str
```

## License

[MIT License](LICENSE.md)
