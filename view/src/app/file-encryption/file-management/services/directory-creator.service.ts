import {Injectable} from '@angular/core';
import {AbstractFileModel} from "./abstract-file.model";
import {fileInfo} from "./file-info.model";
import {FileManagementService} from "./file-management.service";
import {AbstractFileCreatorService} from "./abstract-file-creator.service";
import {remote} from "electron";
const Menu = remote.Menu;
const MenuItem = remote.MenuItem;

@Injectable()
export class DirectoryCreatorService implements AbstractFileCreatorService {
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
      },
      contextMenu(event, state: FileManagementService) {
        event.stopPropagation();
        let self = this;
        AbstractFileCreatorService.menu.insert(0, new MenuItem({
          label: 'Delete',
          click: function (menuItem, browserWindow) {
            state.removeFile(self);
          }
        }));
        AbstractFileCreatorService.menu.popup(remote.getCurrentWindow());
      }
    });
  }
}