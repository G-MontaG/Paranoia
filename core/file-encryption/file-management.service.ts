const {ipcMain} = require('electron');
const path = require('path');
import {FileSystemService} from "../file-system.service";
import {appConfigService} from "../app-config.service";

class FileManagementService {
  constructor() {
    this._init();
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
          err.message = "Error reading config file. " + err.message;
          throw err;
        });
    });
  }


}


new FileManagementService();