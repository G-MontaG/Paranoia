import {Component, OnInit} from "@angular/core";
import {CryptProgressService} from "./service/crypt-progress.service";
import {FileEncryptionService} from "../service/file-encryption.service";

@Component({
  selector: 'crypt-progress',
  templateUrl: './crypt-progress.component.html',
  providers: []
})
export class CryptProgressComponent implements OnInit {
  constructor(private _fileEncryptionService: FileEncryptionService,
              private _cryptProgressService: CryptProgressService) {
  }

  ngOnInit() {
    this._cryptProgressService.subscribeToProgress(
      this._fileEncryptionService.config).subscribe(
        (message) => {
          console.log(message);
        });

    this._cryptProgressService.sendFileEncryptionConfig(
      this._fileEncryptionService.fileList,
      this._fileEncryptionService.config);
  }
}