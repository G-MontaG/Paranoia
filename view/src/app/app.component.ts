import {Component} from '@angular/core';
import {OnInit} from '@angular/core';
import {AppConfigService} from './services/app-config.service';

@Component({
  selector: 'app',
  templateUrl: './app.component.html',
  providers: [AppConfigService]
})
export class AppComponent implements OnInit {
  constructor(private appConfigService: AppConfigService) {
  }

  ngOnInit() {
  }
}