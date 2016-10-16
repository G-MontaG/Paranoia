import {Component, ChangeDetectorRef, OnInit} from "@angular/core";
import {AppConfigService} from "../services/app-config.service";
import {FormGroup, FormControl, Validators} from "@angular/forms";

@Component({
  selector: 'settings',
  templateUrl: './settings.component.html',
  providers: []
})
export class SettingsComponent implements OnInit {
  private settingsForm: FormGroup;

  private fileManagementConfig: FormGroup;
  private keyStorageConfig: FormGroup;
  private connectionConfig: FormGroup;

  private statusSuccess = false;

  private subscribers = [];

  constructor(private changeDetectorRef: ChangeDetectorRef,
              private appConfigService: AppConfigService) {
    this.createForm();
  }

  createForm() {
    this.fileManagementConfig = new FormGroup({
      encryptRoot: new FormControl("", [Validators.required]),
      decryptRoot: new FormControl("", [Validators.required])
    });
    this.keyStorageConfig = new FormGroup({
      root: new FormControl("", [Validators.required])
    });
    this.connectionConfig = new FormGroup({
      root: new FormControl("", [Validators.required])
    });
    this.settingsForm = new FormGroup({
      fileManagementConfig: this.fileManagementConfig,
      keyStorageConfig: this.keyStorageConfig,
      connectionConfig: this.connectionConfig
    });

    this.settingsForm.patchValue({
      fileManagementConfig: this.appConfigService.fileManagementConfig,
      keyStorageConfig: this.appConfigService.keyStorageConfig,
      connectionConfig: this.appConfigService.connectionConfig
    });

    this.settingsForm.valueChanges.subscribe(
      data => {
        this.statusSuccess = false;
      });
  }

  saveConfig(event) {
    this.subscribers.push(this.appConfigService.writeConfigFile(this.settingsForm.value).subscribe(
      status => {
        this.statusSuccess = true;
        this.changeDetectorRef.detectChanges();
      }
    ));
  }

  ngOnInit() {
  }

  ngOnDestroy() {
    _.forEach(this.subscribers, item => {
      item.unsubscribe();
    });
  }
}