import "./vendors.ts";
import {platformBrowserDynamic} from "@angular/platform-browser-dynamic";
import {createAppModule} from "./app/app.module";
import {ipcRenderer} from "electron";
import {appConfig} from "./app/services/app-config.model";
import "./main.scss";

let appConfig;

ipcRenderer.send('readConfigFile');

ipcRenderer.on('readConfigFile-reply', (event, arg: appConfig) => {
  ipcRenderer.send('fileManagementInit');
  appConfig = arg;
});

ipcRenderer.on('fileManagementInit-reply', (event, arg) => {
  platformBrowserDynamic().bootstrapModule(createAppModule(appConfig));
});