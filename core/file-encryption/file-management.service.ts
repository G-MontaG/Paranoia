import moment = require("moment");
import {ipcMain} from 'electron';
import pathModule = require('path');
import fs = require('fs');
import _ = require('lodash');
import fileSize = require('filesize');
import {win} from "../../init";
import {FileSystemService} from "../file-system.service";
import {appConfigService} from "../app-config.service";

class FileManagementService {
  private _watch = {
    encrypt: {
      watcher: null,
      path: null
    },
    decrypt: {
      watcher: null,
      path: null
    }
  };

  constructor() {
    this._init();

    this._getFiles('encrypt');
    this._getFiles('decrypt');
  }

  private _init() {
    ipcMain.on('fileManagementInit', (event, arg) => {
      FileSystemService.stat(appConfigService.fileManagement.encryptRoot)
        .then((stats) => {
          if (!stats) {
            return FileSystemService.mkdir(appConfigService.fileManagement.encryptRoot);
          }
        })
        .then(() => {
          return FileSystemService.stat(appConfigService.fileManagement.decryptRoot);
        })
        .then((stats) => {
          if (!stats) {
            return FileSystemService.mkdir(appConfigService.fileManagement.decryptRoot);
          }
        })
        .then(() => {
          event.sender.send('fileManagementInit-reply', true);
        })
        .catch((err) => {
          err.message = "Error create work folders. " + err.message;
          event.sender.send('fileManagementInit-reply', err);
        });
    });
  }

  private _getFiles(type: string) {
    ipcMain.on(`fileManagementGetFiles-${type}`, (event, arg: string) => {
      let currentPath;
      if (type === 'encrypt') {
        currentPath = pathModule.join(appConfigService.fileManagement.encryptRoot, arg);
      } else {
        currentPath = pathModule.join(appConfigService.fileManagement.decryptRoot, arg);
      }
      FileSystemService.stat(currentPath)
        .then((stats) => {
          if (!stats) {
            event.sender.send(`fileManagementGetFiles-${type}-reply`, false);
          }
        })
        .then(() => {
          if (this._closeWatcher(currentPath, type)) {
            this._createWatcher(currentPath, type);
          }
          return FileSystemService.readdir(currentPath);
        })
        .then((files: Array<string>) => {
          return this._prepareFileList(currentPath, files);
        })
        .then((preparedFiles) => {
          event.sender.send(`fileManagementGetFiles-${type}-reply`, preparedFiles);
        })
        .catch((err) => {
          err.message = "Error reading files from folder. " + err.message;
          event.sender.send(`fileManagementGetFiles-${type}-reply`, err);
        });
    });
  }

  private _createWatcher(path: string, type: string) {
    this._watch[type].path = path;
    this._watch[type].watcher = fs.watch(path, (eventType, filename) => {
      if(eventType === 'change' || eventType === 'rename') {
        win.webContents.send(`fileManagementChangeFiles-${type}`);
      }
    });
  }

  private _closeWatcher(path: string, type: string) {
    if (this._watch[type].path !== path && !!this._watch[type].watcher) {
      this._watch[type].watcher.close();
      this._watch[type].path = null;
      return true;
    } else if(!this._watch[type].watcher) {
      return true;
    }
    return false;
  }

  private _prepareFileList(path: string, files: Array<string>) {
    return new Promise((resolve, reject) => {
      let preparedFiles = [];
      _.forEach(files, (file) => {
        let fileInfo = fs.statSync(pathModule.join(path, file));
        let fileType;
        if(fileInfo.isFile()) {
          fileType = 'file';
        } else if(fileInfo.isDirectory()) {
          fileType = 'dir';
        } else {
          fileType = null;
        }
        preparedFiles.push({
          name: file,
          type: fileType,
          extension: pathModule.extname(file),
          size: fileSize(fileInfo.size),
          accessTime: moment(fileInfo.atime),
          modifyTime: moment(fileInfo.mtime),
          createTime: moment(fileInfo.ctime)
        });
      });
      resolve(preparedFiles);
    });
  }
}

new FileManagementService();

