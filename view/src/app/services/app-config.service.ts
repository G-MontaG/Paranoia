import {Injectable, Inject} from '@angular/core';
import {ipcRenderer} from 'electron';
import {appConfig} from './app-config.model';
import {Subject} from "rxjs";

@Injectable()
export class AppConfigService {
  private _fileManagementConfig: any = {};
  private _keyStorageConfig: any;
  private _rsaConfig: any;

  constructor(@Inject('config') private  config) {
    this.readConfigFile(config);
  }

  public readConfigFile(arg: appConfig) {
    this._fileManagementConfig = arg.fileManagementConfig;
    this._keyStorageConfig = arg.keyStorageConfig;
    this._rsaConfig = arg.rsaConfig;
  }

  public writeConfigFile(config: appConfig) {
    ipcRenderer.send('writeConfigFile', config);

    let response = new Subject();
    ipcRenderer.on('writeConfigFile-reply', (event, arg: boolean) => {
      this._fileManagementConfig = config.fileManagementConfig;
      this._keyStorageConfig = config.keyStorageConfig;
      this._rsaConfig = config.rsaConfig;
      response.next(arg);
      response.complete();
    });
    return response;
  }

  public get fileManagementConfig() {
    return this._fileManagementConfig;
  }

  public set fileManagementConfig(config: any) {
    this._fileManagementConfig = config;
  }

  public get keyStorageConfig() {
    return this._keyStorageConfig;
  }

  public set keyStorageConfig(config: any) {
    this._keyStorageConfig = config;
  }

  public get rsaConfig() {
    return this._rsaConfig;
  }

  public set rsaConfig(config: any) {
    this.rsaConfig = config;
  }
}