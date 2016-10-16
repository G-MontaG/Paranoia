import {Injectable} from '@angular/core';
import {Observable} from "rxjs";
import "lodash";
import {fileInfo} from './file-info.model';
import {AbstractFileCreatorService} from './abstract-file-creator.service';

@Injectable()
export class FileListService {
  private _list = new Observable((observer) => {
    this.observer = observer;
  });
  private observer;
  constructor() {
  }

  public getList() {
    return this._list;
  }

  public setList(files: Array<fileInfo>) {
    let _currentList = [];
    _.forEach(files, (file) => {
      _currentList.push(AbstractFileCreatorService.getCreator(file).create(file));
    });
    this.observer.next(_currentList);
  }
}