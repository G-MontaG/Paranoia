import {Injectable} from '@angular/core';
import {ipcRenderer} from "electron";
import {Observable} from "rxjs";

@Injectable()
export class FileManagementService {
  private _type: string;

  constructor(type: string) {
    this._type = type;
  }

  public getFiles(path: string = '') {
    ipcRenderer.send(`fileManagementGetFiles-${this._type}`, path);

    return new Observable(observer => {
      ipcRenderer.on(`fileManagementGetFiles-${this._type}-reply`, (event, files) => {
        observer.next(files);
        observer.complete();
      });
    });
  }
}