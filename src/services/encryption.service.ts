import {Keys} from '../keys/keys';
const CryptoJs = require('crypto-js');

export class Encryption {
  type: String;

  constructor(type: String) {
    this.type = type;
  }

  Encrypt(text: String) {
    switch (this.type) {
      case Keys.MD5: return CryptoJs.MD5(text).toString();
        break;
      case Keys.AES: return CryptoJs.AES.encrypt(text, Keys.SECRET_KEY).toString();
        break;
      case Keys.SHA_512: return CryptoJs.SHA512(text).toString();
        break;
      default:
        return 'Este tipo de cifrado no es soportado'
    }
  }
}
