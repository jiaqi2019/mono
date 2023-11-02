import crypto from 'crypto'; // KeyObject, // createPublicKey, // createPrivateKey, // createSecretKey,

console.log(crypto.randomBytes(64).toString('hex'));
// console.log(createSecretKey(Buffer.from('我是谁')).type);
