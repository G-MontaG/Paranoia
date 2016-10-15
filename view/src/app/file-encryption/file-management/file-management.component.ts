import {Component, ChangeDetectorRef} from '@angular/core';
import {OnInit} from '@angular/core';
import {FileManagementService} from "./services/file-management.service";

@Component({
  selector: 'file-management',
  templateUrl: './file-management.component.html',
  providers: []
})
export class FileManagementComponent implements OnInit {
  private _encryptFileManagement: FileManagementService;
  private _decryptFileManagement: FileManagementService;

  private filesEncrypted;
  private filesDecrypted;
  constructor(private changeDetectorRef: ChangeDetectorRef) {
    this._encryptFileManagement = new FileManagementService("encrypt");
    this._decryptFileManagement = new FileManagementService("decrypt");
  }

  ngOnInit() {
    this._encryptFileManagement.getFiles().subscribe(
      files => {
        this.filesEncrypted = files;
        this.changeDetectorRef.detectChanges();
      }
    );

    this._decryptFileManagement.getFiles().subscribe(
      files => {
        this.filesDecrypted = files;
        this.changeDetectorRef.detectChanges();
      }
    )
  }
}