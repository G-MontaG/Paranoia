import {NgModule} from "@angular/core";
import {RouterModule} from "@angular/router";
import {ReactiveFormsModule, FormsModule} from "@angular/forms";
import {BrowserModule} from "@angular/platform-browser";
import {routes} from "./file-encription.routes";
import {FileEncryptionComponent} from "./file-encryption.component";
import {FileManagementComponent} from "./file-management/file-management.component";
import {FileManagementService} from "./file-management/services/file-management.service";
import {FileListService} from "./file-management/services/file-list.service";
import {FileCreatorService} from "./file-management/services/file-creator.service";
import {DirectoryCreatorService} from "./file-management/services/directory-creator.service";
import {CryptConfiguringComponent} from "./crypt-configuring/crypt-configuring.component";
import {CryptProgressComponent} from "./crypt-progress/crypt-progress.component";

@NgModule({
  declarations: [
    FileEncryptionComponent,
    FileManagementComponent,
    CryptConfiguringComponent,
    CryptProgressComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forChild(routes),
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [
    FileManagementService,
    FileListService,
    FileCreatorService,
    DirectoryCreatorService,
  ]
})
export class FileEncryptionModule {
}