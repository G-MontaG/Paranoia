import {Component, OnInit, OnDestroy, AfterViewInit} from "@angular/core";
import {CryptProgressService} from "./service/crypt-progress.service";
import {FileEncryptionService} from "../service/file-encryption.service";
import {Router} from "@angular/router";

@Component({
  selector: 'crypt-progress',
  templateUrl: './crypt-progress.component.html',
  providers: []
})
export class CryptProgressComponent implements OnInit, OnDestroy, AfterViewInit {
  constructor(private _router: Router,
              private _fileEncryptionService: FileEncryptionService,
              private _cryptProgressService: CryptProgressService) {
  }

  private _progressBar;
  public isDone = false;

  private _subscribers = [];

  ngOnInit() {
    this._subscribers.push(
      this._cryptProgressService.subscribeToProgress(this._fileEncryptionService.config)
        .subscribe(
          (message) => {
            console.log(message);
            this._setProgressBarValue();
          })
    );

    this._cryptProgressService.sendFileEncryptionConfig(
      this._fileEncryptionService.fileList,
      this._fileEncryptionService.config);
  }

  ngAfterViewInit() {
    this._progressBar = $('#progressIndicator');
    this._progressBar.progress({
        label: 'ratio',
        total: this._fileEncryptionService.fileList.length,
        text: {
          active: `${this._fileEncryptionService.config.type} {value} of {total} files`,
          success: `{total} files ${this._fileEncryptionService.config.type}!`
        }
      }
    );
  }

  ngOnDestroy() {
    _.forEach(this._subscribers, item => {
      item.unsubscribe();
    });
  }

  private _setProgressBarValue() {
    this._progressBar.progress('increment');
    if (this._progressBar.progress('value') === this._fileEncryptionService.fileList.length) {
      this.isDone = true;
    }
  }

  public done(event) {
    event.preventDefault();
    event.stopPropagation();
    this._router.navigate(['file-encryption']);
  }
}