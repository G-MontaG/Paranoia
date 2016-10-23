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
  private encryptFileManagement: FileManagementService;
  private decryptFileManagement: FileManagementService;

  private encryptFileList: FileListService;
  private decryptFileList: FileListService;

  public encryptList: Array<AbstractFileModel>;
  public decryptList: Array<AbstractFileModel>;

  private subscribers = [];

  constructor(private _changeDetection: ChangeDetectorRef) {
    this.encryptFileManagement = new FileManagementService('encrypt');
    this.decryptFileManagement = new FileManagementService('decrypt');

    this.encryptFileList = new FileListService('encrypt');
    this.decryptFileList = new FileListService('decrypt');
  }

  ngOnInit() {
    this.subscribers.push(this.encryptFileManagement.subscribeFiles().subscribe(
      (list: Array<fileInfo>) => {
        this.encryptList = this.encryptFileList.createList(list);
        this._changeDetection.detectChanges();
      }
    ));

    this.subscribers.push(this.decryptFileManagement.subscribeFiles().subscribe(
      (list: Array<fileInfo>) => {
        this.decryptList = this.decryptFileList.createList(list);
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