import {Injectable, Inject} from '@angular/core';
import {ipcRenderer} from 'electron';
import {appConfig} from './app-config.model';

@Injectable()
export class AppConfigService {
  private _fileManagementConfig: any = {};
  private _keyStorageConfig: any;
  private _rsaConfig: any;

  private _isConfigChange: boolean = false;

  constructor(@Inject('config') private  config) {
    this.readConfigFile(config);
  }

  public readConfigFile(arg: appConfig) {
    this._fileManagementConfig = arg.fileManagementConfig;
    this._keyStorageConfig = arg.keyStorageConfig;
    this._rsaConfig = arg.rsaConfig;
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