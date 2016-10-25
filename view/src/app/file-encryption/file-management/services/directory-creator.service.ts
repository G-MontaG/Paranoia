import {Injectable} from "@angular/core";
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

  private menu;

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
        let fileContextMenuTemplate = [
          {
            label: 'Delete',
            click: function () {
              state.removeDir(self);
            }
          }
        ];
        this.menu = Menu.buildFromTemplate(fileContextMenuTemplate);
        this.menu.popup(remote.getCurrentWindow());
      }
    });
  }
}