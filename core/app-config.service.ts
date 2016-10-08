const {ipcMain} = require('electron');
const fs = require('fs');
const path = require('path');
import {FileSystemService} from './file-system.service'

let configPath = path.join(__dirname, '..', 'app-config.json');

ipcMain.on('readConfigFile', (event, arg) => {
  FileSystemService.checkPathExist(configPath).then(stat => {
    if (!stat) {
      return generateDefaultConfig();
    }
  }).then(() => {
    fs.readFile(configPath, (err, data) => {
      if (err) {
        err.message = "Error reading config file. Config file does not exist. " + err.message;
        throw err;
      }
      try {
        let json = JSON.parse(data);
        event.sender.send('readConfigFile-reply', json)
      } catch(err) {
        err.message = "Error on parsing config file. " + err.message;
        throw err;
      }
    });
  });
});

ipcMain.on('writeConfigFile', (event, arg) => {
  fs.writeFile(configPath, JSON.stringify(arg, null, 2), (err, data) => {
    if (err) {
      err.message = "Error writing config file. " + err.message;
      event.sender.send('writeConfigFile-reply', false);
      throw err;
    }
    event.sender.send('writeConfigFile-reply', true);
  });
});

function generateDefaultConfig() {
  let defaultConfig = {
    fileManagementConfig: {
      root: "/path"
    },
    keyStorageConfig: {
      root: "/path"
    },
    rsaConfig: {
      root: "/path"
    }
  };
  return new Promise((resolve, reject) => {
    fs.writeFile(configPath, JSON.stringify(defaultConfig, null, 2), (err, data) => {
      if (err) {
        err.message = "Error writing config file. " + err.message;
        reject();
        throw err;
      }
      resolve();
    });
  });
}