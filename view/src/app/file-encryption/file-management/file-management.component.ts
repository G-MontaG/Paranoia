import {Component, ChangeDetectorRef} from '@angular/core';
import {OnInit} from '@angular/core';
import {FileManagementService} from "./services/file-management.service";
import {FileListService} from "./services/file-list.service";
import {fileInfo} from "./services/file-info.model";

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

  public encryptList;
  public decryptList;

  constructor(private _changeDetection: ChangeDetectorRef) {
    this._encryptFileManagement = new FileManagementService("encrypt");
    this._decryptFileManagement = new FileManagementService("decrypt");

    this._encryptFileList = new FileListService();
    this._decryptFileList = new FileListService();
  }

  ngOnInit() {
    this._encryptFileList.getList().subscribe(
      list => {
        this.encryptList = list;
        this._changeDetection.detectChanges();
      }
    );

    this._decryptFileList.getList().subscribe(
      list => {
        this.decryptList = list;
        this._changeDetection.detectChanges();
      }
    );

    this._encryptFileManagement.getFiles().subscribe(
      (files: Array<fileInfo>) => {
        this._encryptFileList.setList(files);
      }
    );

    this._decryptFileManagement.getFiles().subscribe(
      (files: Array<fileInfo>) => {
        this._decryptFileList.setList(files);
      }
    )
  }
}