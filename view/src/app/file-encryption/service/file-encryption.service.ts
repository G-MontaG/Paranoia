import {Injectable} from '@angular/core';
import {AbstractFileModel} from '../file-management/services/abstract-file.model';

@Injectable()
export class FileEncryptionService {
  private _fileList: Array<AbstractFileModel>;
  private _config: FileEncryptionConfig = {};
  private _progress: any;

  constructor() {
  }

  public get fileList(): Array<AbstractFileModel> {
    return this._fileList;
  }

  public set fileList(fileList: Array<AbstractFileModel>) {
    this._fileList = fileList;
  }

  public get config(): FileEncryptionConfig {
    return this._config;
  }

  public set config(config) {
    this._config = config;
  }

  public get progress() {
    return this._progress;
  }

  public set progress(progress) {
    this._progress = progress;
  }
}

export interface FileEncryptionConfig {
  type?: string,
  algorithm?: string,
  password?: string,
  salt?: string
}