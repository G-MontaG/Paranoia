import {NgModule} from "@angular/core";
import {RouterModule} from "@angular/router";
import {ReactiveFormsModule, FormsModule} from "@angular/forms";
import {routes} from "./settings.routes";
import {SettingsComponent} from "./settings.component";

@NgModule({
  declarations: [
    SettingsComponent
  ],
  imports: [
    RouterModule.forChild(routes),
    FormsModule,
    ReactiveFormsModule,
  ],
  providers: [

  ]
})
export class SettingsModule {
}
