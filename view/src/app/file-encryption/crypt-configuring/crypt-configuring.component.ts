import {Component, OnInit, OnDestroy, AfterViewInit} from "@angular/core";
import {Router} from "@angular/router";
import {FileEncryptionService} from "../service/file-encryption.service";
import {CryptConfiguringService} from "./service/crypt-configuring.service";
import {FormControl, FormGroup, FormBuilder} from "@angular/forms";

@Component({
  selector: 'crypt-configuring',
  templateUrl: './crypt-configuring.component.html',
  providers: []
})
export class CryptConfiguringComponent implements OnInit, OnDestroy, AfterViewInit {
  public configuringForm: FormGroup;
  public algorithm: FormControl;

  constructor(private _router: Router,
              private _fb: FormBuilder,
              public fileEncryptionService: FileEncryptionService,
              public cryptConfiguringService: CryptConfiguringService) {
  }

  ngOnInit() {
    this.initForm();
  }

  ngAfterViewInit() {
    $('div.file-info').popup();
  }

  ngOnDestroy() {

  }

  private initForm() {
    this.algorithm = new FormControl("aes-256-gcm");

    this.configuringForm = this._fb.group({
      algorithm: this.algorithm
    });
  }

  public cancel(event) {
    event.stopPropagation();
    this._router.navigate(['file-encryption']);
  }
}