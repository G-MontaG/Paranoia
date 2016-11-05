import {Injectable} from "@angular/core";
const _ = require('lodash');
import {fileInfo} from "./file-info.model";
import {AbstractFileCreatorService} from "./abstract-file-creator.service";
import {AbstractFileModel} from "./abstract-file.model";

@Injectable()
export class FileListService {
  constructor() {

  }

  public createList(files: Array<fileInfo>, state: string) {
    let currentList = [];
    _.forEach(files, (file) => {
      currentList.push(AbstractFileCreatorService.getCreator(file).create(file, state));
    });
    return currentList;
  }

  public getSelectedList(list: Array<AbstractFileModel>) {
    let selectedFiles = [];
    _.forEach(list, (file) => {
      if(file.isSelected() && file.type === 'file') {
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