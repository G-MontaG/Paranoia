import {Injectable} from "@angular/core";
import "lodash";
import {AbstractFileCreatorService} from "./abstract-file-creator.service";
import {fileInfo} from "./file-info.model";
import {AbstractFileModel} from "./abstract-file.model";
import {FileManagementService} from "./file-management.service";

@Injectable()
export class FileCreatorService implements AbstractFileCreatorService {
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
      }
    });
  }
}