import {Component, ChangeDetectorRef, OnInit, OnDestroy} from "@angular/core";
import {FileManagementService} from "./services/file-management.service";
import {FileEncryptionService} from "../service/file-encryption.service";
import {FileListService} from "./services/file-list.service";
import {fileInfo} from "./services/file-info.model";
import {AbstractFileModel} from "./services/abstract-file.model";
import {Router} from "@angular/router";

@Component({
  selector: 'file-management',
  templateUrl: './file-management.component.html',
  providers: []
})
export class FileManagementComponent implements OnInit, OnDestroy {
  private encryptFileManagementService: FileManagementService;
  private decryptFileManagementService: FileManagementService;

  private encryptFileListService: FileListService;
  private decryptFileListService: FileListService;

  public encryptList: Array<AbstractFileModel>;
  public decryptList: Array<AbstractFileModel>;

  private subscribers = [];

  constructor(private _changeDetection: ChangeDetectorRef,
              private _router: Router,
              private _fileEncryptionService: FileEncryptionService) {
    this.encryptFileManagementService = new FileManagementService('encrypt');
    this.decryptFileManagementService = new FileManagementService('decrypt');

    this.encryptFileListService = new FileListService();
    this.decryptFileListService = new FileListService();
  }

  ngOnInit() {
    this.subscribers.push(this.encryptFileManagementService.subscribeFiles().subscribe(
      (list: Array<fileInfo>) => {
        this.encryptList = this.encryptFileListService.createList(list,
          this.encryptFileManagementService.getCurrentState());
        this._changeDetection.detectChanges();
      }
    ));

    this.subscribers.push(this.decryptFileManagementService.subscribeFiles().subscribe(
      (list: Array<fileInfo>) => {
        this.decryptList = this.decryptFileListService.createList(list,
          this.encryptFileManagementService.getCurrentState());
        this._changeDetection.detectChanges();
      }
    ));
  }

  ngOnDestroy() {
    _.forEach(this.subscribers, item => {
      item.unsubscribe();
    });
  }

  public startConfiguring(event, type: string) {
    event.stopPropagation();
    let selectedList;
    if (type === 'encrypt') {
      selectedList = this.encryptFileListService.getSelectedList(this.encryptList);
      this._fileEncryptionService.config.type = 'encrypt';
    } else {
      selectedList = this.decryptFileListService.getSelectedList(this.decryptList);
      this._fileEncryptionService.config.type = 'decrypt';
    }
    this._fileEncryptionService.fileList = selectedList;
    this._router.navigate(['file-encryption', 'configuring']);
  }
}