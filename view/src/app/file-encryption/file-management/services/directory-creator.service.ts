import {Injectable} from '@angular/core';
import {AbstractFileModel} from "./abstract-file.model";
import {fileInfo} from "./file-info.model";
import {FileManagementService} from "./file-management.service";

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
      switchSelection(event) {
        event.stopPropagation();
        this.selected = !this.selected;
      },
      enter(event, state: FileManagementService) {
        event.stopPropagation();
        state.enterDir(this.name);
      }
    });
  }
}