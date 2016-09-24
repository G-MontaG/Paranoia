import {NgModule} from "@angular/core";
import {RouterModule} from "@angular/router";
import {routes} from "./settings.routes";
import {SettingsComponent} from "./settings.component";

@NgModule({
  declarations: [
    SettingsComponent
  ],
  imports: [
    RouterModule.forChild(routes)
  ],
  providers: [

  ]
})
export class SettingsModule {
}
