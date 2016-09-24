import {NgModule} from "@angular/core";
import {RouterModule} from "@angular/router";
import {routes} from "./rsa.routes";
import {RsaComponent} from "./rsa.component";

@NgModule({
  declarations: [
    RsaComponent
  ],
  imports: [
    RouterModule.forChild(routes)
  ],
  providers: [

  ]
})
export class RsaModule {
}
