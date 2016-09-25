const {ipcMain} = require('electron');
const fs = require('fs');
const path = require('path');

ipcMain.on('readConfigFile', (event, arg) => {
  fs.readFile(path.join(__dirname, '..', 'app-config.json'), (err, data) => {
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