import {appConfigService} from "../app-config.service";
const fs = require('fs');
const pathModule = require('path');
const crypto = require('crypto');
import _ = require('lodash');
import moment = require("moment");
import {ipcMain} from "electron";
import {AlgorithmConfigService, AlgorithmConfig} from "./algorithms-config.service";
import {FileSystemService} from "../file-system.service";
import {HashService} from "./hash.service";
import {FileListItem} from "./file.model";

class CryptService {
  private type: string;

  constructor(type: string) {
    this.type = type;
    this._encryptFiles();
  }

  private _encryptFiles() {
    ipcMain.on(`cryptFiles-${this.type}`,
      (event, arg: {fileList: Array<FileListItem>, config: ViewCryptConfig}) => {
        let algorithmConfig: AlgorithmConfig = AlgorithmConfigService.getConfig(arg.config.algorithm);
        _.forEach(arg.fileList, (file) => {
          let generatedHash;
          FileSystemService.stat(file.fullPath)
            .then(() => {
              return HashService.getHash(arg.config.password, algorithmConfig.keyLength, arg.config.salt);
            })
            .then((hash) => {
              generatedHash = hash;;
              return FileSystemService.readFile(file.fullPath);
            })
            .then((plaintext) => {
              let iv = crypto.randomBytes(algorithmConfig.ivLength);
              let cipher = crypto.createCipheriv(algorithmConfig.algorithm, generatedHash, iv);
              let cipherText = Buffer.concat([cipher.update(plaintext), cipher.final()]);
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
            .then((encipheringResult: any) => {
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
            .then((cipherText) => {
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
}

new CryptService('encrypt');
new CryptService('decrypt');

interface ViewCryptConfig {
  type?: string,
  algorithm?: string,
  password?: string,
  salt?: string
}