import {Routes} from "@angular/router";
import {FileManagementComponent} from "./file-management/file-management.component";
import {CryptConfiguringComponent} from "./crypt-configuring/crypt-configuring.component";
import {CryptProgressComponent} from "./crypt-progress/crypt-progress.component";

export const routes: Routes = [
  {
    path: 'file-encryption', children: [
    {
      path: '',
      component: FileManagementComponent
    },
    {
      path: 'configuring',
      component: CryptConfiguringComponent
    },
    {
      path: 'progress',
      component: CryptProgressComponent
    }
  ]
  }
];