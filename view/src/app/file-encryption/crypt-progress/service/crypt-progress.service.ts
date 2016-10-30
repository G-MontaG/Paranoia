import {Injectable} from "@angular/core";
import {ipcRenderer} from "electron";
import {Observable} from "rxjs";
import {AbstractFileModel} from "../../file-management/services/abstract-file.model";
import {FileEncryptionConfig} from "../../service/file-encryption.service";

@Injectable()
export class CryptProgressService {
  constructor() {
  }

  public subscribeToProgress(config: FileEncryptionConfig) {
    return new Observable(observer => {
      ipcRenderer.on(`cryptFiles-${config.type}-reply`, (event, message) => {
        observer.next(message);
      });
    });
  }

  public sendFileEncryptionConfig(fileList: Array<AbstractFileModel>, config: FileEncryptionConfig) {
    ipcRenderer.send(`cryptFiles-${config.type}`, {
      fileList: fileList,
      config: config
    });
  }
}