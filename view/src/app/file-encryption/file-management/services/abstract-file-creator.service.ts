import {Injectable} from "@angular/core";
import {fileInfo} from "./file-info.model";
import {AbstractFileModel} from "./abstract-file.model";
import {FileCreatorService} from "./file-creator.service";
import {DirectoryCreatorService} from "./directory-creator.service";
import {remote} from "electron";
const Menu = remote.Menu;
const MenuItem = remote.MenuItem;

@Injectable()
export abstract class AbstractFileCreatorService {
  constructor() {
  }

  private static fileCreator = new FileCreatorService();
  private static directoryCreator = new DirectoryCreatorService();

  public abstract create(file: fileInfo);

  public static getCreator(file: fileInfo) {
    if (file.type === 'file') {
      return this.fileCreator;
    } else if (file.type === 'dir') {
      return this.directoryCreator;
    } else {
      return null;
    }
  }

  public static menu = new Menu();
}