const {ipcMain} = require('electron');
const path = require('path');
import {FileSystemService} from "../file-system.service";
import {appConfigService} from "../app-config.service";

class FileManagementService {
  constructor() {
    this._init();
    this._getFiles();
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

  private _getFiles() {
    ipcMain.on('fileManagementGetFiles', (event, arg: {type: string, path: string}) => {
      console.log(arg);
      let currentPath;
      if (arg.type === 'encrypt') {
        console.log(appConfigService.fileManagement.encryptRoot);
        currentPath = path.join(appConfigService.fileManagement.encryptRoot, arg.path);
      } else {
        currentPath = path.join(appConfigService.fileManagement.decryptRoot, arg.path);
      }
      FileSystemService.stat(currentPath)
        .then((stats) => {
          if (!stats) {
            event.sender.send('fileManagementGetFiles-reply', false);
          }
        })
        .then(() => {
          return FileSystemService.readdir(currentPath);
        })
        .then((files) => {
          event.sender.send('fileManagementGetFiles-reply', files);
        })
        .catch((err) => {
          err.message = "Error reading files from folder. " + err.message;
          event.sender.send('fileManagementGetFiles-reply', err);
        });
    });
  }
}


new FileManagementService();