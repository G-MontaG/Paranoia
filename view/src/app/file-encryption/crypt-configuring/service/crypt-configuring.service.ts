import {Injectable} from "@angular/core";
const crypto = require('crypto');
const passwordGenerator = require('password-generator');

@Injectable()
export class CryptConfiguringService {
  public algorithms = [
    {key: 'aes-256-gcm', value: 'AES 256 GCM'},
    {key: 'aes-192-gcm', value: 'AES 192 GCM'},
    {key: 'aes-128-gcm', value: 'AES 128 GCM'},

    {key: 'aes-256-ctr', value: 'AES 256 CTR'},
    {key: 'aes-192-ctr', value: 'AES 192 CTR'},
    {key: 'aes-128-ctr', value: 'AES 128 CTR'},

    {key: 'aes-256-ofb', value: 'AES 256 OFB'},
    {key: 'aes-192-ofb', value: 'AES 192 OFB'},
    {key: 'aes-128-ofb', value: 'AES 128 OFB'},
    {key: 'bf-ofb', value: 'Blowfish 128 OFB'},
    {key: 'camellia-256-ofb', value: 'Camellia 256 OFB'},
    {key: 'camellia-192-ofb', value: 'Camellia 192 OFB'},
    {key: 'camellia-128-ofb', value: 'Camellia 128 OFB'},

    {key: 'aes-256-cfb', value: 'AES 256 CFB'},
    {key: 'aes-192-cfb', value: 'AES 192 CFB'},
    {key: 'aes-128-cfb', value: 'AES 128 CFB'},
    {key: 'bf-cfb', value: 'Blowfish 128 CFB'},
    {key: 'camellia-256-cfb', value: 'Camellia 256 CFB'},
    {key: 'camellia-192-cfb', value: 'Camellia 192 CFB'},
    {key: 'camellia-128-cfb', value: 'Camellia 128 CFB'},

    {key: 'aes-256-cbc', value: 'AES 256 CBC'},
    {key: 'aes-192-cbc', value: 'AES 192 CBC'},
    {key: 'aes-128-cbc', value: 'AES 128 CBC'},
    {key: 'bf-cbc', value: 'Blowfish 128 CBC'},
    {key: 'camellia-256-cbc', value: 'Camellia 256 CBC'},
    {key: 'camellia-192-cbc', value: 'Camellia 192 CBC'},
    {key: 'camellia-128-cbc', value: 'Camellia 128 CBC'},

    {key: 'aes-256-xts', value: 'AES 256 XTS'}
  ];

  private _minLength: number = 12;
  private _minLengthSalt: number = 128;

  constructor() {
  }

  public setPasswordSize(size: number) {
    this._minLength = size;
  }

  public generatePassword() {
    let self = this;
    let uppercaseMinCount = 3;
    let lowercaseMinCount = 3;
    let numberMinCount = 2;
    let specialMinCount = 2;
    let UPPERCASE_RE = /([A-Z])/g;
    let LOWERCASE_RE = /([a-z])/g;
    let NUMBER_RE = /([\d])/g;
    let SPECIAL_CHAR_RE = /([\!\@\#\$\%\^\&\*\(\)\=\_\+\,\.\/\<\>\?\;\'\:\"\|\{\}])/g;
    let NON_REPEATING_CHAR_RE = /([\w\d\!\@\#\$\%\^\&\*\(\)\=\_\+\,\.\/\<\>\?\;\'\:\"\|\{\}])\1{2,}/g;

    function isStrongEnough(password) {
      let uc = password.match(UPPERCASE_RE);
      let lc = password.match(LOWERCASE_RE);
      let n = password.match(NUMBER_RE);
      let sc = password.match(SPECIAL_CHAR_RE);
      let nr = password.match(NON_REPEATING_CHAR_RE);
      return password.length >= self._minLength &&
        !nr &&
        uc && uc.length >= uppercaseMinCount &&
        lc && lc.length >= lowercaseMinCount &&
        n && n.length >= numberMinCount &&
        sc && sc.length >= specialMinCount;
    }

    function createPassword() {
      let password = "";
      while (!isStrongEnough(password)) {
        password = passwordGenerator(self._minLength, false,
          /[\w\d\!\@\#\$\%\^\&\*\(\)\=\_\+\,\.\/\<\>\?\;\'\:\"\|\{\}]/);
      }
      return password;
    }

    return createPassword();
  }

  public setSaltSize(size: number) {
    this._minLengthSalt = size;
  }

  public generateSalt() {
    return crypto.randomBytes(this._minLengthSalt).toString('hex');
  }
}