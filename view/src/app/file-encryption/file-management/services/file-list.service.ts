import {Injectable} from '@angular/core';
import {Observable} from "rxjs";
import "lodash";
import {fileInfo} from './file-info.model';
import {AbstractFileCreatorService} from './abstract-file-creator.service';
import {AbstractFileModel} from "./abstract-file.model";
import {FileManagementService} from "./file-management.service";

@Injectable()
export class FileListService {
  private _fileManagement: FileManagementService;

  private observer;
  private _list = new Observable((observer) => {
    this.observer = observer;
  });

  constructor(type: string) {
    this._fileManagement = new FileManagementService(type);

    this._fileManagement.getFiles().subscribe(
      (files: Array<fileInfo>) => {
        this.setList(files);
      }
    );
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

  public static getSelectedList(list: Array<AbstractFileModel>) {
    let selectedFiles = [];
    _.forEach(list, (file) => {
      if(file.isSelected()) {
        selectedFiles.push(file);
      }
    });
    return selectedFiles;
  }

  public selectFilesByShift(list: Array<AbstractFileModel>, fromIndex:number, toIndex:number) {
    _.forEach(_.slice(list, fromIndex, toIndex), (file) => {
      file.switchSelection();
    });
  }
}