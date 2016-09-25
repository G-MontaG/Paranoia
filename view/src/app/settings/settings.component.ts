import {Component} from '@angular/core';
import {OnInit} from '@angular/core';
import {AppConfigService} from '../services/app-config.service';

@Component({
  selector: 'settings',
  templateUrl: './settings.component.html',
  providers: []
})
export class SettingsComponent implements OnInit {
  private fileManagementConfig;

  constructor(private appConfigService: AppConfigService) {
    this.fileManagementConfig = this.appConfigService.fileManagementConfig;
  }

  ngOnInit() {
  }
}