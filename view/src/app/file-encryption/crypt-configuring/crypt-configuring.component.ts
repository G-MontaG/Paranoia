import {Component, OnInit, OnDestroy, AfterViewInit, ElementRef} from "@angular/core";
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
  public typeOfForm: string = 'manual';
  public manualPassword: FormControl;
  public manualSalt: FormControl;

  constructor(private _router: Router,
              private _fb: FormBuilder,
              private _el: ElementRef,
              public fileEncryptionService: FileEncryptionService,
              public cryptConfiguringService: CryptConfiguringService) {
  }

  ngOnInit() {
    this.initForm();
  }

  ngAfterViewInit() {
    $('div.file-info').popup();
    $('.menu .item').tab();
    $('.ui.dropdown').dropdown();
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

  public hidePassword(event) {
    event.stopPropagation();
    let target = this._el.nativeElement.getElementsByClassName('password');
    _.forEach(target, (item) => {
      if(item.getAttribute('type') === 'text') {
        item.setAttribute('type', 'password');
      } else {
        item.setAttribute('type', 'text');
      }
    });
  }

  public generatePassword(event) {
    event.stopPropagation();
    this.manualPassword.patchValue(this.cryptConfiguringService.generatePassword());
  }

  public generateSalt(event) {
    event.stopPropagation();
    this.manualSalt.patchValue(this.cryptConfiguringService.generateSalt());
  }

  public cancel(event) {
    event.stopPropagation();
    this._router.navigate(['file-encryption']);
  }

  public setConfig(event) {
    event.stopPropagation();
    this.fileEncryptionService.config.algorithm = this.algorithm.value;
    if(this.typeOfForm === 'manual') {
      this.fileEncryptionService.config.password = this.manualConfiguringForm.value.password;
      this.fileEncryptionService.config.salt = this.manualConfiguringForm.value.salt;
    }
    console.log(this.fileEncryptionService.config);
  }
}