import crypto, {
  createSecretKey,
  createPrivateKey,
  createPublicKey,
  KeyObject,
} from 'crypto';

console.log(crypto.randomBytes(64).toString('hex'));
console.log(crypto.randomBytes(64).toString('hex'));
console.log(createSecretKey(Buffer.from('我是谁')).type);
