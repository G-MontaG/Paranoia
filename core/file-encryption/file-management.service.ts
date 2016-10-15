const {ipcMain} = require('electron');
const path = require('path');
import {FileSystemService} from "../file-system.service";
import {appConfigService} from "../app-config.service";

class FileManagementService {
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
}


new FileManagementService();