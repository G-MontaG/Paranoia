const {ipcMain} = require('electron');

ipcMain.on('readConfigFile', (event, arg) => {
  console.log("readConfigFile");
  event.sender.send('readConfigFile-reply', 'pong')
});