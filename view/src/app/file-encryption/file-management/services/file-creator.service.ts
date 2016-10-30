import {Injectable} from "@angular/core";
const _ = require('lodash');
const path = require('path');
import {AbstractFileCreatorService} from "./abstract-file-creator.service";
import {fileInfo} from "./file-info.model";
import {FileManagementService} from "./file-management.service";
import {remote} from "electron";
const Menu = remote.Menu;

@Injectable()
export class FileCreatorService implements AbstractFileCreatorService {
  constructor() {
  }

  private menu;

  public create(file: fileInfo, state: string) {
    return _.assign(file, {
      path: path.join(state, file.name),
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
      },
      contextMenu(event, state: FileManagementService) {
        event.stopPropagation();
        let self = this;
        let fileContextMenuTemplate = [
          {
            label: 'Delete',
            click: function () {
              state.removeFile(self);
            }
          }
        ];
        this.menu = Menu.buildFromTemplate(fileContextMenuTemplate);
        this.menu.popup(remote.getCurrentWindow());
      }
    });
  }
}