import {Component} from '@angular/core';
import {OnInit} from '@angular/core';
import {AppConfigService} from '../services/app-config.service';
import {FormGroup, FormControl, Validators, FormGroupName, FormBuilder} from "@angular/forms";

@Component({
  selector: 'settings',
  templateUrl: './settings.component.html',
  providers: []
})
export class SettingsComponent implements OnInit {
  private settingsForm: FormGroup;

  private fileManagementConfig: FormGroup;
  private keyStorageConfig: FormGroup;
  private rsaConfig: FormGroup;

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
    this.appConfigService.writeConfigFile(this.settingsForm.value);
  }

  ngOnInit() {
  }
}