import {Injectable} from '@angular/core';
import {AbstractFileModel} from "./abstract-file.model";
import {fileInfo} from "./file-info.model";

@Injectable()
export class DirectoryCreatorService {
  constructor() {
  }

  public create(file: fileInfo) {
    return _.assign(file, {
      selected: false,
      isSelected() {
        return this.selected;
      },
      switchSelection() {
        this.selected = !this.selected;
      }
    });
  }
}