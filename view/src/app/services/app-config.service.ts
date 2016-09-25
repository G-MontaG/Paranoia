import {Injectable} from '@angular/core';
import {ipcRenderer} from 'electron';

@Injectable()
export class AppConfigService {
  private _fileManagementConfig: any;
  private _keyStorageConfig: any;
  private _rsaConfig: any;

  private _isConfigChange: boolean;

  constructor() {
    ipcRenderer.send('readConfigFile');
    console.log("work");

    ipcRenderer.on('readConfigFile-reply', (event, arg) => {
      this.readConfigFile(arg);
    });
  }

  public readConfigFile(arg: any) {
    console.log("readConfigFile", arg);
  }

  public writeConfigFile() {

  }

  public get fileManagementConfig() {
    return this._fileManagementConfig;
  }

  public set fileManagementConfig(config: any) {
    this._isConfigChange = true;
    this._fileManagementConfig = config;
  }

  public get keyStorageConfig() {
    return this._keyStorageConfig;
  }

  public set keyStorageConfig(config: any) {
    this._isConfigChange = true;
    this._keyStorageConfig = config;
  }

  public get rsaConfig() {
    return this._rsaConfig;
  }

  public set rsaConfig(config: any) {
    this._isConfigChange = true;
    this.rsaConfig = config;
  }

  public get isConfigChange() {
    return this._isConfigChange;
  }
}