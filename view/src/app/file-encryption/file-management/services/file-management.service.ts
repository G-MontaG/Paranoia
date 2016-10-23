import {Injectable} from '@angular/core';
import {ipcRenderer} from "electron";
import {Observable} from "rxjs";
import path = require('path');

@Injectable()
export class FileManagementService {
  private _type: string;

  private _state: Array<string> = [];
  private _currentStateIndex: number = this._state.length - 1;

  constructor(type: string) {
    this._type = type;
    this._watchFiles();
  }

  public subscribeFiles(path: string = '') {
    this.getFiles('/');
    this.setNewState('/');
    return new Observable(observer => {
      ipcRenderer.on(`fileManagementGetFiles-${this._type}-reply`, (event, files) => {
        observer.next(files);
      });
    });
  }

  public getFiles(path: string = '') {
    ipcRenderer.send(`fileManagementGetFiles-${this._type}`, path);
  }

  public _watchFiles() {
    ipcRenderer.on(`fileManagementChangeFiles-${this._type}`, (event) => {
      ipcRenderer.send(`fileManagementGetFiles-${this._type}`,
        this.getCurrentState());
    });
  }

  public getPreviousState(): string | null {
    this._currentStateIndex--;
    return this._state[this._currentStateIndex] ? this._state[this._currentStateIndex] : null;
  };

  public getNextState(): string | null {
    this._currentStateIndex++;
    return this._state[this._currentStateIndex] ? this._state[this._currentStateIndex] : null;
  };

  public getCurrentState(): string {
    return this._state[this._currentStateIndex];
  };

  public setNewState(state:string) {
    this._state.push(state);
    this._currentStateIndex = this._state.length - 1;
  };

  public enterDir(name: string) {
    console.log(name);
    let newPath = path.join(this.getCurrentState(), name);
    this.getFiles(newPath);
    this.setNewState(newPath);
  }
}