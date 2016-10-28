import {Injectable} from '@angular/core';
const passwordGenerator = require('password-generator');

@Injectable()
export class CryptConfiguringService {
  public algorithms = [
    'aes-256-gcm',
    'aes-192-gcm',
    'aes-128-gcm',

    'aes-256-ctr',
    'aes-192-ctr',
    'aes-128-ctr',

    'aes-256-ofb',
    'aes-192-ofb',
    'aes-128-ofb',
    'blowfish-ofb',
    'camellia-256-ofb',
    'camellia-192-ofb',
    'camellia-128-ofb',

    'aes-256-cfb',
    'aes-192-cfb',
    'aes-128-cfb',
    'blowfish-cfb',
    'camellia-256-cfb',
    'camellia-192-cfb',
    'camellia-128-cfb',

    'aes-256-cbc',
    'aes-192-cbc',
    'aes-128-cbc',
    'blowfish-cbc',
    'camellia-256-cbc',
    'camellia-192-cbc',
    'camellia-128-cbc',

    'aes-256-xts'
  ];

  private _minLength: number = 12;

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
}