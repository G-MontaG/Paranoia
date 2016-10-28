import {Component, OnInit, OnDestroy, AfterViewInit, ElementRef} from "@angular/core";
import {Router} from "@angular/router";
import {FileEncryptionService} from "../service/file-encryption.service";
import {CryptConfiguringService} from "./service/crypt-configuring.service";
import {FormControl, FormGroup, FormBuilder, Validators} from "@angular/forms";
const passwordGenerator = require('password-generator');

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

  private _minLength: number = 12;

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

  public setPasswordSize(size: number) {
    this._minLength = size;
  }

  public generatePassword(event) {
    event.stopPropagation();
    let self = this;
    let uppercaseMinCount = 3;
    let lowercaseMinCount = 3;
    let numberMinCount = 2;
    let specialMinCount = 2;
    let UPPERCASE_RE = /([A-Z])/g;
    let LOWERCASE_RE = /([a-z])/g;
    let NUMBER_RE = /([\d])/g;
    let SPECIAL_CHAR_RE = /([\!\@\#\$\%\^\&\*\(\)\=\_\+\,\.\/\<\>\?\;\'\:\"\|\{\}])/g;
    let NON_REPEATING_CHAR_RE = /([\w\d\!\@\#\$\%\^\&\*\(\)\=\_\+\,\.\/\<\>\?\;\'\:\"\|\{\}])\1{2,}/g;

    function isStrongEnough(password) {
      let uc = password.match(UPPERCASE_RE);
      let lc = password.match(LOWERCASE_RE);
      let n = password.match(NUMBER_RE);
      let sc = password.match(SPECIAL_CHAR_RE);
      let nr = password.match(NON_REPEATING_CHAR_RE);
      return password.length >= self._minLength &&
        !nr &&
        uc && uc.length >= uppercaseMinCount &&
        lc && lc.length >= lowercaseMinCount &&
        n && n.length >= numberMinCount &&
        sc && sc.length >= specialMinCount;
    }

    function createPassword() {
      let password = "";
      while (!isStrongEnough(password)) {
        password = passwordGenerator(self._minLength, false,
          /[\w\d\!\@\#\$\%\^\&\*\(\)\=\_\+\,\.\/\<\>\?\;\'\:\"\|\{\}]/);
      }
      return password;
    }

    this.manualPassword.patchValue(createPassword());
  }

  public generateSalt(event) {
    event.stopPropagation();

  }

  public cancel(event) {
    event.stopPropagation();
    this._router.navigate(['file-encryption']);
  }
}