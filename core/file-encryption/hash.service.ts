const crypto = require('crypto');

export class HashService {
  public static getHash(password: string, keyLength: number, salt: string) {
    return new Promise((resolve, reject) => {
      let length = keyLength || 512;
      crypto.pbkdf2(password, salt, 100000, length, 'sha512', (err, hashStr) => {
        if (err) {
          reject(err);
        }
        resolve(hashStr);
      });
    });
  }

  public static compareHash(password: string, hash: string, salt: string) {
    return new Promise((resolve, reject) => {
      resolve(this.getHash(password, hash.length, salt).then((generatedHash) => {
        return hash.toString() === generatedHash.toString();
      }));
    });
  }
}