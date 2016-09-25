import {Injectable} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {Subject} from 'rxjs/Subject';
import {ipcRenderer} from 'electron';
import {appConfig} from './app-config.model';

@Injectable()
export class AppConfigService {
  private _fileManagementConfig: Subject = new Subject;
  private _keyStorageConfig: any;
  private _rsaConfig: any;

  private _isConfigChange: boolean = false;

  constructor() {
    ipcRenderer.send('readConfigFile');

    ipcRenderer.on('readConfigFile-reply', (event, arg: appConfig) => {
      this.readConfigFile(arg);
    });
  }

  public readConfigFile(arg: appConfig) {
    this._fileManagementConfig.next(arg.fileManagementConfig);
    this._keyStorageConfig = arg.keyStorageConfig;
    this._rsaConfig = arg.rsaConfig;
  }

  public writeConfigFile() {

  }

  public get fileManagementConfig() {
    return this._fileManagementConfig.asObservable();
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