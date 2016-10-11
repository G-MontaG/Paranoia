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
      FileSystemService.stat(appConfigService.roots.fileManagement.encrypt)
        .then((stats) => {
          if (!stats) {
            return FileSystemService.mkdir(appConfigService.roots.fileManagement.encrypt);
          }
        })
        .then(() => {
          return FileSystemService.stat(appConfigService.roots.fileManagement.decrypt);
        })
        .then((stats) => {
          if (!stats) {
            return FileSystemService.mkdir(appConfigService.roots.fileManagement.decrypt);
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
        console.log(appConfigService.roots.fileManagement.encrypt);
        currentPath = path.join(appConfigService.roots.fileManagement.encrypt, arg.path);
      } else {
        currentPath = path.join(appConfigService.roots.fileManagement.decrypt, arg.path);
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