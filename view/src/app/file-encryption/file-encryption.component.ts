import {Component} from '@angular/core';
import {OnInit} from '@angular/core';
import {ipcRenderer} from "electron";

@Component({
  selector: 'file-encryption',
  templateUrl: './file-encryption.component.html',
  providers: []
})
export class FileEncryptionComponent implements OnInit {
  constructor() {
  }

  ngOnInit() {
    ipcRenderer.send('fileManagementGetFiles', {type: 'encrypt', path: ''});

    ipcRenderer.on('fileManagementGetFiles-reply', (event, files) => {
      console.log(files);
    });
  }
}