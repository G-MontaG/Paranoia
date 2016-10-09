const fs = require('fs');
const path = require('path');

export class FileSystemService {
  constructor() {

  }

  public static stat(path: string) {
    return new Promise((resolve, reject) => {
      fs.stat(path, (err, stats) => {
        if (err) {
          resolve(false);
        }
        resolve(stats);
      });
    });
  }

  public static writeFile(path: string | Buffer, data: string | Buffer, options?: Object | string) {
    return new Promise((resolve, reject) => {
      fs.writeFile(path, data, options, (err) => {
        if (err) {
          reject(err);
        }
        resolve();
      });
    });
  }

  public static readFile(path: string | Buffer, options?: Object | string) {
    return new Promise((resolve, reject) => {
      fs.readFile(path, options, (err, data) => {
        if (err) {
          reject(err);
        }
        resolve(data);
      });
    });
  }

  public static mkdir(path: string | Buffer, mode?: number) {
    return new Promise((resolve, reject) => {
      fs.mkdir(path, mode, (err, stats) => {
        if (err) {
          reject(err);
        }
        resolve(stats);
      });
    });
  }
}