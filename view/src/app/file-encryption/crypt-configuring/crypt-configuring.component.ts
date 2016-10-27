import {Component, OnInit, OnDestroy, AfterViewInit} from "@angular/core";
import {Router} from "@angular/router";
import {FileEncryptionService} from "../service/file-encryption.service";
import {CryptConfiguringService} from "./service/crypt-configuring.service";
import {FormControl, FormGroup, FormBuilder, Validators} from "@angular/forms";

@Component({
  selector: 'crypt-configuring',
  templateUrl: './crypt-configuring.component.html',
  providers: []
})
export class CryptConfiguringComponent implements OnInit, OnDestroy, AfterViewInit {
  public manualConfiguringForm: FormGroup;
  public keyStorageConfiguringForm: FormGroup;
  public algorithm: FormControl;
  public manualPassword: FormControl;
  public manualSalt: FormControl;

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
    $('.menu .item').tab();
  }

  ngOnDestroy() {

  }

  private initForm() {
    this.algorithm = new FormControl("aes-256-gcm");

    this.manualPassword = new FormControl("", [Validators.required, Validators.minLength(6)]);
    this.manualSalt = new FormControl("", [Validators.required, Validators.minLength(32)]);

    this.manualConfiguringForm = this._fb.group({
      password: this.manualPassword,
      salt: this.manualSalt
    });
  }

  public cancel(event) {
    event.stopPropagation();
    this._router.navigate(['file-encryption']);
  }
}