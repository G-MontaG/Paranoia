const fs = require('fs');

export class FileSystemService {
  constructor() {

  }

  static checkPathExist(path: string) {
    return new Promise((resolve, reject) => {
      fs.stat(path, (err, stats) => {
        if(err) {
          resolve(false);
        }
        resolve(stats);
      });
    });
  }
}