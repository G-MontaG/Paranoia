import {Injectable} from "@angular/core";
import {ipcRenderer} from "electron";
const crypto = require('crypto');
const passwordGenerator = require('password-generator');

@Injectable()
export class CryptConfiguringService {
  public algorithms = [];

  private _minLength: number = 12;
  private _minLengthSalt: number = 128;

  constructor() {
    ipcRenderer.send(`cryptConfiguringGetAlgorithms`);

    ipcRenderer.on(`cryptConfiguringGetAlgorithms-reply`, (event, algorithms) => {
      this.algorithms = algorithms;
    });
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