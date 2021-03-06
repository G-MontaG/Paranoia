import {Injectable} from "@angular/core";
import {ipcRenderer} from "electron";
import {Observable} from "rxjs";
import {AbstractFileModel} from "./abstract-file.model";
const path = require('path');

@Injectable()
export class FileManagementService {
  private _type: string;

  private _state: Array<string> = [];
  private _currentStateIndex: number = -1;

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

  public addFiles() {
    ipcRenderer.send(`fileManagementAddFiles-${this._type}`, this.getCurrentState());
  }

  public removeFile(file: AbstractFileModel) {
    ipcRenderer.send(`fileManagementRemoveFile-${this._type}`, {
      path: this.getCurrentState(),
      fileName: file.name
    });
  }

  public removeDir(file: AbstractFileModel) {
    ipcRenderer.send(`fileManagementRemoveDir-${this._type}`, {
      path: this.getCurrentState(),
      dirName: file.name
    });
  }

  public getPreviousState() {
    if (this._currentStateIndex > 0) {
      this._currentStateIndex--;
    }
    this.getFiles(this.getCurrentState());
  };

  public getNextState() {
    if (this._currentStateIndex < this._state.length - 1) {
      this._currentStateIndex++;
    }
    this.getFiles(this.getCurrentState());
  };

  public getCurrentState(): string {
    return this._state[this._currentStateIndex];
  };

  public setNewState(state: string) {
    if (this._currentStateIndex === this._state.length - 1) {
      this._state.push(state);
      this.sliceStateArray();
    } else {
      this._state = _.take(this._state, this._currentStateIndex + 1);
      this._state.push(state);
    }
    this._currentStateIndex = this._state.length - 1;
  };

  private sliceStateArray() {
    if (this._state.length > 5) {
      this._state = _.drop(this._state);
    }
  }

  public enterDir(name: string) {
    let newPath = path.join(this.getCurrentState(), name);
    this.getFiles(newPath);
    this.setNewState(newPath);
  }
}