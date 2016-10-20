import {Component, ChangeDetectorRef} from '@angular/core';
import {OnInit} from '@angular/core';
import {FileManagementService} from "./services/file-management.service";
import {FileListService} from "./services/file-list.service";
import {fileInfo} from "./services/file-info.model";
import {AbstractFileModel} from "./services/abstract-file.model";

@Component({
  selector: 'file-management',
  templateUrl: './file-management.component.html',
  providers: []
})
export class FileManagementComponent implements OnInit {
  private _encryptFileManagement: FileManagementService;
  private _decryptFileManagement: FileManagementService;

  private _encryptFileList: FileListService;
  private _decryptFileList: FileListService;

  public encryptList: Array<AbstractFileModel>;
  public decryptList: Array<AbstractFileModel>;

  private subscribers = [];

  constructor(private _changeDetection: ChangeDetectorRef) {
    this._encryptFileManagement = new FileManagementService('encrypt');
    this._decryptFileManagement = new FileManagementService('decrypt');

    this._encryptFileList = new FileListService('encrypt');
    this._decryptFileList = new FileListService('decrypt');
  }

  ngOnInit() {
    this.subscribers.push(this._encryptFileManagement.getFiles().subscribe(
      (list: Array<fileInfo>) => {
        this.encryptList = this._encryptFileList.createList(list);
        this._changeDetection.detectChanges();
      }
    ));

    this.subscribers.push(this._decryptFileManagement.getFiles().subscribe(
      (list: Array<fileInfo>) => {
        this.decryptList = this._decryptFileList.createList(list);
        this._changeDetection.detectChanges();
      }
    ));
  }

  ngOnDestroy() {
    _.forEach(this.subscribers, item => {
      item.unsubscribe();
    });
  }
}