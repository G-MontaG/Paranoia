import {NgModule} from "@angular/core";
import {RouterModule} from "@angular/router";
import {routes} from "./file-encription.routes";
import {FileEncryptionComponent} from "./file-encryption.component";

@NgModule({
  declarations: [
    FileEncryptionComponent
  ],
  imports: [
    RouterModule.forChild(routes)
  ],
  providers: [

  ]
})
export class FileEncryptionModule {
}
