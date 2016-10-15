const {ipcMain} = require('electron');
const path = require('path');
const fs = require('fs');
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
        currentPath = path.join(appConfigService.fileManagement.encryptRoot, arg);
      } else {
        currentPath = path.join(appConfigService.fileManagement.decryptRoot, arg);
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
        .then((files) => {
          event.sender.send(`fileManagementGetFiles-${type}-reply`, files);
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
        console.log(eventType, filename);
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
}

new FileManagementService();