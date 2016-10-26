import {Component, OnInit, OnDestroy, AfterViewInit} from "@angular/core";
import {FileEncryptionService} from "../service/file-encryption.service";
import {Router} from "@angular/router";

@Component({
  selector: 'crypt-configuring',
  templateUrl: './crypt-configuring.component.html',
  providers: []
})
export class CryptConfiguringComponent implements OnInit, OnDestroy, AfterViewInit {
  constructor(private _router: Router,
              public fileEncryptionService: FileEncryptionService) {
    console.log(fileEncryptionService.fileList);
  }

  ngOnInit() {

  }

  ngAfterViewInit() {
    $('div.file-info').popup();
  }

  ngOnDestroy() {

  }

  public cancel(event) {
    event.stopPropagation();
    this._router.navigate(['file-encryption']);
  }
}