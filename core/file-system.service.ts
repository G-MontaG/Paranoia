const fs = require('fs');

export class FileSystemService {
  constructor() {

  }

  static checkPathExist(path: string) {
    return fs.stat(path, (err, stats) => {
      if(err) {
        return false;
      }
      return stats;
    });
  }
}