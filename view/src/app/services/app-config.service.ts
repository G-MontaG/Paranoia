import {Injectable, Inject} from '@angular/core';
import {ipcRenderer} from 'electron';
import {appConfig} from './app-config.model';
import {Observable} from "rxjs";

@Injectable()
export class AppConfigService {
  private _fileManagementConfig: any = {};
  private _keyStorageConfig: any;
  private _connectionConfig: any;

  constructor(@Inject('config') private  config) {
    this.readConfigFile(config);
  }

  public readConfigFile(arg: appConfig) {
    this._fileManagementConfig = arg.fileManagementConfig;
    this._keyStorageConfig = arg.keyStorageConfig;
    this._connectionConfig = arg.connectionConfig;
  }

  public writeConfigFile(config: appConfig) {
    ipcRenderer.send('writeConfigFile', config);

    return new Observable(observer => {
      ipcRenderer.on('writeConfigFile-reply', (event, arg: boolean) => {
        this._fileManagementConfig = config.fileManagementConfig;
        this._keyStorageConfig = config.keyStorageConfig;
        this._connectionConfig = config.connectionConfig;
        observer.next(arg);
        observer.complete();
      });
    });
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

  public get connectionConfig() {
    return this._connectionConfig;
  }

  public set connectionConfig(config: any) {
    this.connectionConfig = config;
  }
}