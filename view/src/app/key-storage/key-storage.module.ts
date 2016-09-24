import {NgModule} from "@angular/core";
import {RouterModule} from "@angular/router";
import {routes} from "./key-storage.routes";
import {KeyStorageComponent} from "./key-storage.component";

@NgModule({
  declarations: [
    KeyStorageComponent
  ],
  imports: [
    RouterModule.forChild(routes)
  ],
  providers: [

  ]
})
export class KeyStorageModule {
}
