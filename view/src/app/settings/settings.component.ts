import {Component} from '@angular/core';
import {OnInit, OnChanges} from '@angular/core';
import {AppConfigService} from '../services/app-config.service';
import {FormGroup, FormControl, Validators, FormGroupName, FormBuilder} from "@angular/forms";

@Component({
  selector: 'settings',
  templateUrl: './settings.component.html',
  providers: []
})
export class SettingsComponent implements OnInit, OnChanges {
  private settingsForm: FormGroup;

  private fileManagementConfig: FormGroup;
  private keyStorageConfig: FormGroup;
  private rsaConfig: FormGroup;

  private statusSuccess = false;
  private statusError = false;

  constructor(private appConfigService: AppConfigService) {
    this.createForm();
  }

  createForm() {
    this.fileManagementConfig = new FormGroup({
      root: new FormControl("", [Validators.required])
    });
    this.keyStorageConfig = new FormGroup({
      root: new FormControl("", [Validators.required])
    });
    this.rsaConfig = new FormGroup({
      root: new FormControl("", [Validators.required])
    });
    this.settingsForm = new FormGroup({
      fileManagementConfig: this.fileManagementConfig,
      keyStorageConfig: this.keyStorageConfig,
      rsaConfig: this.rsaConfig
    });

    this.settingsForm.patchValue({
      fileManagementConfig: this.appConfigService.fileManagementConfig,
      keyStorageConfig: this.appConfigService.keyStorageConfig,
      rsaConfig: this.appConfigService.rsaConfig
    });
  }

  saveConfig(event) {
    this.appConfigService.writeConfigFile(this.settingsForm.value).subscribe(
      status => {
        console.log(this);
        this.statusSuccess = true;
      },
      error => {
        this.statusError = true;
      }
    );
  }

  ngOnChanges(changes) {
    console.log(changes);
  }

  ngOnInit() {
  }
}