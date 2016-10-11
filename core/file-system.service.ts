const fs = require('fs');
const pathModule = require('path');
const os = require('os');

/**
 * File system API service.
 * This is adapted and promisified asynchronous functions from Node file system module.
 * If you want to use synchronous function - use Node file system module directly.
 * Use synchronous function carefully, they may block view.
 * It makes sense to use synchronous function only inside other promise.
 */
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

  public static rename(oldPath: string | Buffer, newPath: string | Buffer) {
    return new Promise((resolve, reject) => {
      fs.rename(oldPath, newPath, () => {
        resolve();
      });
    });
  }

  public static unlink(path: string | Buffer) {
    return new Promise((resolve, reject) => {
      fs.unlink(path, () => {
        resolve();
      });
    });
  }

  public static mkdir(path: string | Buffer, mode?: number) {
    return new Promise((resolve, reject) => {
      function mkdirs(dirPath, mode) {
        //Call the standard fs.mkdir
        fs.mkdir(dirPath, mode, function(error: {code: string}) {
          //When it fail in this way, do the custom steps
          if (error && error.code === 'ENOENT') {
            //Create all the parents recursively
            mkdirs(pathModule.dirname(dirPath), mode);
            //And then the directory
            mkdirs(dirPath, mode);
          }
          resolve();
        });
      }
      mkdirs(path, mode);
    });
  }

  public static rmdir(path: string | Buffer) {
    return new Promise((resolve, reject) => {
      this.readdir(path)
        .then((files: Array<string>) => {
          files.forEach((file) => {
            let filename = pathModule.join(path, file);
            let stat = fs.statSync(filename);
            if(filename == "." || filename == "..") {
              // pass these files
            } else if(stat.isDirectory()) {
              this.rmdir(filename);
            } else {
              fs.unlinkSync(filename);
            }
          });
        })
        .then(() => {
          fs.rmdirSync(path);
          resolve();
        })
        .catch((err) => {
          reject(err);
        });
    });
  }

  public static readdir(path: string | Buffer, options?: Object | string) {
    return new Promise((resolve, reject) => {
      fs.readdir(path, options, (err, files) => {
        if (err) {
          reject(err);
        }
        resolve(files);
      });
    });
  }

  public static copyFile(fromPath: string | Buffer, toPath: string | Buffer) {
    return new Promise((resolve, reject) => {
      let read = fs.createReadStream(fromPath);
      read.on("error", function (err) {
        reject(err);
      });
      var write = fs.createWriteStream(toPath);
      write.on("error", function (err) {
        reject(err);
      });
      write.on("close", function (ex) {
        resolve();
      });
      read.pipe(write);
    });
  }

  public static replaceFile(fromPath: string | Buffer, toPath: string | Buffer) {
    return new Promise((resolve, reject) => {
      this.copyFile(fromPath, toPath)
        .then(() => {
          return this.unlink(fromPath);
        })
        .then(() => {
          resolve();
        }).catch((err) => {
          reject(err);
        });
    });
  }

  public static getUserHomePath() {
    return os.homedir();
  }

  public static getAppPath() {
    return process.cwd();
  }
}