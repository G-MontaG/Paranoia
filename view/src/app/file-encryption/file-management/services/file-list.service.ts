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
    let currentList = [];
    _.forEach(files, (file) => {
      currentList.push(AbstractFileCreatorService.getCreator(file).create(file));
    });
    return currentList;
  }

  public getSelectedList(list: Array<AbstractFileModel>) {
    let selectedFiles = [];
    _.forEach(list, (file) => {
      if(file.isSelected()) {
        selectedFiles.push(file);
      }
    });
    return selectedFiles;
  }

  public unselectedList(event: Event, list: Array<AbstractFileModel>) {
    event.stopPropagation();
    _.forEach(list, (file) => {
      file.selected = false;
    });
    return list;
  }

  public selectFilesByShift(list: Array<AbstractFileModel>, fromIndex:number, toIndex:number) {
    _.forEach(_.slice(list, fromIndex, toIndex), (file) => {
      file.switchSelection();
    });
  }
}