/* eslint-disable new-cap */
// @ts-ignore
const CryptoJS = require('crypto-js');

const secretKey = 'jaS4VUDw1XPjReqHou6r';

class Crypto {
    encrypt(message) {
        const cryptoMessage = CryptoJS.SHA3(message, secretKey);
        return cryptoMessage;
    }
}

// @ts-ignore
module.exports = new Crypto;
