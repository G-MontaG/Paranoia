import {Injectable} from '@angular/core';
import {Observable, BehaviorSubject} from "rxjs";
import "lodash";
import {fileInfo} from './file-info.model';
import {AbstractFileCreatorService} from './abstract-file-creator.service';
import {AbstractFileModel} from "./abstract-file.model";
import {FileManagementService} from "./file-management.service";

@Injectable()
export class FileListService {
  constructor(type: string) {

  }

  public createList(files: Array<fileInfo>) {
    let _currentList = [];
    _.forEach(files, (file) => {
      _currentList.push(AbstractFileCreatorService.getCreator(file).create(file));
    });
    console.log("set");
    return _currentList;
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