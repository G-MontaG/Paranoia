const {ipcMain} = require('electron');
const path = require('path');
import {FileSystemService} from "./file-system.service";
import {appConfig} from "./app-config.model";

/**
 * App config service.
 * Don't use it directly. All function called by view.
 * If config file doesn't exist, it create default.
 */
class AppConfigService {
  private _configPath;
  public config: appConfig;

  constructor() {
    this._configPath = path.join(FileSystemService.getAppPath(), 'app-config.json');

    this._readConfigFile();
    this._writeConfigFile();
  }

  private _readConfigFile() {
    var self = this;
    ipcMain.on('readConfigFile', (event, arg) => {
      FileSystemService.stat(self._configPath)
        .then(stat => {
          if (!stat) {
            return self._generateDefaultConfig();
          }
        })
        .then(() => {
          return FileSystemService.readFile(self._configPath);
        })
        .then((data: string) => {
          try {
            let json = JSON.parse(data);
            self.config = json;
            event.sender.send('readConfigFile-reply', json);
          } catch (err) {
            err.message = "Error on parsing config file. " + err.message;
            throw err;
          }
        })
        .catch((err) => {
          err.message = "Error reading config file. " + err.message;
          throw err;
        });
    });
  }

  private _writeConfigFile() {
    var self = this;
    ipcMain.on('writeConfigFile', (event, arg) => {
      FileSystemService.writeFile(self._configPath, JSON.stringify(arg, null, 2))
        .then(() => {
          self.config = arg;
          event.sender.send('writeConfigFile-reply', true);
        })
        .catch((err) => {
          err.message = "Error writing config file. " + err.message;
          event.sender.send('writeConfigFile-reply', false);
          throw err;
        });
    });
  }

  private _generateDefaultConfig() {
    let self = this;
    let defaultConfig = {
      fileManagementConfig: {
        root: {
          encrypt: path.join(FileSystemService.getUserHomePath(), 'Paranoia', 'Encrypt'),
          decrypt: path.join(FileSystemService.getUserHomePath(), 'Paranoia', 'Decrypt'),
        }
      },
      keyStorageConfig: {
        root: path.join(FileSystemService.getUserHomePath(), 'Paranoia', 'KeyStorage')
      },
      connectionConfig: {
        root: path.join(FileSystemService.getUserHomePath(), 'Paranoia', 'Connections')
      }
    };
    return FileSystemService.writeFile(self._configPath, JSON.stringify(defaultConfig, null, 2));
  }

  public get roots() {
    let self = this;
    return {
      fileManagement: {
        encrypt: self.config.fileManagementConfig.root.encrypt,
        decrypt: self.config.fileManagementConfig.root.decrypt
      },
      keyStorage: self.config.keyStorageConfig.root,
      connection: self.config.connectionConfig.root
    }
  }
}

export const appConfigService = new AppConfigService();