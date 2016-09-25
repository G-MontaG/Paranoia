import {Component} from '@angular/core';
import {OnInit} from '@angular/core';
import {AppConfigService} from '../services/app-config.service';

@Component({
  selector: 'settings',
  templateUrl: './settings.component.html',
  providers: []
})
export class SettingsComponent implements OnInit {
  private fileManagementConfig = "dupa";

  constructor(private appConfigService: AppConfigService) {
    this.appConfigService.fileManagementConfig.subscribe(data => {
      console.log(data);
      this.fileManagementConfig = data;
    });
  }

  ngOnInit() {
  }
}