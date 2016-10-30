import moment = require("moment");
import {ipcMain, dialog} from "electron";
import {win} from "../../init";
import {FileSystemService} from "../file-system.service";
import {appConfigService} from "../app-config.service";
const pathModule = require('path');
const fs = require('fs');
import _ = require('lodash');
import fileSize = require('filesize');

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

  private type: string;

  constructor(type: string) {
    this.type = type;
    this._getFiles();
    this._addFiles();
    this._removeFile();
    this._removeDir();
  }

  public static init() {
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

  private _getFiles() {
    ipcMain.on(`fileManagementGetFiles-${this.type}`, (event, arg: string) => {
      let currentPath = pathModule.join(appConfigService.fileManagement[`${this.type}Root`], arg);
      FileSystemService.stat(currentPath)
        .then((stats) => {
          if (!stats) {
            event.sender.send(`fileManagementGetFiles-${this.type}-reply`, false);
          }
        })
        .then(() => {
          if (this._closeWatcher(currentPath, this.type)) {
            this._createWatcher(currentPath, this.type);
          }
          return FileSystemService.readdir(currentPath);
        })
        .then((files: Array<string>) => {
          return this._prepareFileList(currentPath, files);
        })
        .then((preparedFiles) => {
          event.sender.send(`fileManagementGetFiles-${this.type}-reply`, preparedFiles);
        })
        .catch((err) => {
          err.message = "Error reading files from folder. " + err.message;
          event.sender.send(`fileManagementGetFiles-${this.type}-reply`, err);
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
          fullPath: pathModule.join(path, file),
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

  private _addFiles() {
    ipcMain.on(`fileManagementAddFiles-${this.type}`, (event, arg: string) => {
      let currentPath = pathModule.join(appConfigService.fileManagement[`${this.type}Root`], arg);
      let arrayOfFiles = dialog.showOpenDialog({
        title: `Add files to ${this.type} folder`,
        defaultPath: FileSystemService.getUserHomePath(),
        buttonLabel: 'Add',
        properties: ['openFile', 'multiSelections']
      });
      _.forEach(arrayOfFiles, (filePath) => {
        let toPath = pathModule.join(currentPath, pathModule.basename(filePath));
        FileSystemService.copyFile(filePath, toPath);
      });
    });
  }

  private _removeFile() {
    ipcMain.on(`fileManagementRemoveFile-${this.type}`, (event, arg: {path: string, fileName: string}) => {
      let currentPath = pathModule.join(
        appConfigService.fileManagement[`${this.type}Root`], arg.path, arg.fileName);
      FileSystemService.unlink(currentPath);
    });
  }

  private _removeDir() {
    ipcMain.on(`fileManagementRemoveDir-${this.type}`, (event, arg: {path: string, dirName: string}) => {
      let currentPath = pathModule.join(
        appConfigService.fileManagement[`${this.type}Root`], arg.path, arg.dirName);
      FileSystemService.rmdir(currentPath);
    });
  }
}

new FileManagementService('encrypt');
new FileManagementService('decrypt');

FileManagementService.init();