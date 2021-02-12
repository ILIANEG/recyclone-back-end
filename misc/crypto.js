const CryptoJS = require('crypto-js');

module.exports.encryp = text => {
  const passphrase = 'testAlwaysGood';
  return CryptoJS.AES.encrypt(text, passphrase).toString();
};

module.exports.decrypt = ciphertext => {
  const passphrase = 'testAlwaysGood';
  const bytes = CryptoJS.AES.decrypt(ciphertext, passphrase);
  const originalText = bytes.toString(CryptoJS.enc.Utf8);
  return originalText;
};