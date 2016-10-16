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
  private _encryptFileList: FileListService;
  private _decryptFileList: FileListService;

  public encryptList: Array<AbstractFileModel>;
  public decryptList: Array<AbstractFileModel>;

  constructor(private _changeDetection: ChangeDetectorRef) {
    this._encryptFileList = new FileListService('encrypt');
    this._decryptFileList = new FileListService('decrypt');
  }

  ngOnInit() {
    this._encryptFileList.getList().subscribe(
      (list: Array<AbstractFileModel>) => {
        this.encryptList = list;
        this._changeDetection.detectChanges();
      }
    );

    this._decryptFileList.getList().subscribe(
      (list: Array<AbstractFileModel>) => {
        this.decryptList = list;
        this._changeDetection.detectChanges();
      }
    );
  }
}