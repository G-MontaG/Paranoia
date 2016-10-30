import {appConfigService} from "../app-config.service";
import {ipcMain} from "electron";
import {AlgorithmConfigService, AlgorithmConfig} from "./algorithms-config.service";
import {FileSystemService} from "../file-system.service";
import {HashService} from "./hash.service";
import {FileListItem} from "./file.model";
const fs = require('fs');
const pathModule = require('path');
const crypto = require('crypto');
import _ = require('lodash');
import moment = require("moment");

class CryptService {
  private type: string;

  constructor(type: string) {
    this.type = type;
    this._encryptFiles();
    this._decryptFiles();
  }

  private _encryptFiles() {
    ipcMain.on(`cryptFiles-encrypt`,
      (event, arg: {fileList: Array<FileListItem>, config: ViewCryptConfig}) => {
        let algorithmConfig: AlgorithmConfig = AlgorithmConfigService.getConfig(arg.config.algorithm);
        _.forEach(arg.fileList, (file) => {
          let generatedHash;
          FileSystemService.stat(file.fullPath)
            .then(() => {
              return HashService.getHash(arg.config.password, algorithmConfig.keyLength, arg.config.salt);
            })
            .then((hash: string) => {
              generatedHash = hash;
              return FileSystemService.readFile(file.fullPath);
            })
            .then((plainText: Buffer) => {
              let iv = crypto.randomBytes(algorithmConfig.ivLength);
              let cipher = crypto.createCipheriv(algorithmConfig.algorithm, generatedHash, iv);
              let cipherText = Buffer.concat([cipher.update(plainText), cipher.final()]);
              if (algorithmConfig.requireTag) {
                let tag = cipher.getAuthTag();
                return {
                  iv: iv,
                  tag: tag,
                  cipherText: cipherText
                };
              } else {
                return {
                  iv: iv,
                  cipherText: cipherText
                };
              }
            })
            .then((encipheringResult: {
              iv: Buffer,
              tag?: Buffer,
              cipherText: Buffer
            }) => {
              let cipherText = Buffer.from('');
              if (algorithmConfig.requireTag) {
                cipherText = Buffer.concat([
                  encipheringResult.iv,
                  encipheringResult.tag,
                  encipheringResult.cipherText
                ]);
              } else {
                cipherText = Buffer.concat([
                  encipheringResult.iv,
                  encipheringResult.cipherText
                ]);
              }
              return cipherText;
            })
            .then((cipherText: Buffer) => {
              return FileSystemService.writeFile(
                pathModule.join(appConfigService.fileManagement.decryptRoot, file.path),
                cipherText
              );
            })
            .then(() => {
              event.sender.send(`cryptFiles-${this.type}-reply`, file.name);
            })
            .catch((err) => {
              console.log(err);
            })
        });
      });
  }

  private _decryptFiles() {
    ipcMain.on(`cryptFiles-decrypt`,
      (event, arg: {fileList: Array<FileListItem>, config: ViewCryptConfig}) => {
        let algorithmConfig: AlgorithmConfig = AlgorithmConfigService.getConfig(arg.config.algorithm);
        _.forEach(arg.fileList, (file) => {
          let generatedHash;
          FileSystemService.stat(file.fullPath)
            .then(() => {
              return HashService.getHash(arg.config.password, algorithmConfig.keyLength, arg.config.salt);
            })
            .then((hash: string) => {
              generatedHash = hash;
              return FileSystemService.readFile(file.fullPath);
            })
            .then((cipherText: Buffer) => {
              let cipherObject = {};
              if (algorithmConfig.requireTag) {
                cipherObject = {
                  iv: cipherText.slice(0, algorithmConfig.ivLength),
                  tag: cipherText.slice(
                    algorithmConfig.ivLength,
                    algorithmConfig.ivLength + algorithmConfig.tagLength),
                  cipherText: cipherText.slice(
                    algorithmConfig.ivLength + algorithmConfig.tagLength,
                    cipherText.length)
                };
              } else {
                cipherObject = {
                  iv: cipherText.slice(0, algorithmConfig.ivLength),
                  cipherText: cipherText.slice(algorithmConfig.ivLength, cipherText.length)
                };
              }
              return cipherObject;
            })
            .then((cipherObject: {
              iv: Buffer,
              tag?: Buffer,
              cipherText: Buffer
            }) => {
              let decipher = crypto.createDecipheriv(algorithmConfig.algorithm, generatedHash, cipherObject.iv);
              if (algorithmConfig.requireTag) {
                decipher.setAuthTag(cipherObject.tag);
              }
              return Buffer.concat([decipher.update(cipherObject.cipherText), decipher.final()]);
            })
            .then((plainText: Buffer) => {
              return FileSystemService.writeFile(
                pathModule.join(appConfigService.fileManagement.encryptRoot, file.path),
                plainText
              );
            })
            .then(() => {
              event.sender.send(`cryptFiles-decrypt-reply`, file.name);
            })
            .catch((err) => {
              console.log(err);
            })
        });
      });
  }
}

new CryptService('encrypt');
new CryptService('decrypt');

interface ViewCryptConfig {
  type?: string,
  algorithm?: string,
  password?: string,
  salt?: string
}