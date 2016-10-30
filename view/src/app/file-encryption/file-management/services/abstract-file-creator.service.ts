import {Injectable} from "@angular/core";
import {fileInfo} from "./file-info.model";
import {FileCreatorService} from "./file-creator.service";
import {DirectoryCreatorService} from "./directory-creator.service";

@Injectable()
export abstract class AbstractFileCreatorService {
  constructor() {
  }

  private static fileCreator = new FileCreatorService();
  private static directoryCreator = new DirectoryCreatorService();

  public abstract create(file: fileInfo, state: string);

  public static getCreator(file: fileInfo): AbstractFileCreatorService | null {
    if (file.type === 'file') {
      return this.fileCreator;
    } else if (file.type === 'dir') {
      return this.directoryCreator;
    } else {
      return null;
    }
  }
}