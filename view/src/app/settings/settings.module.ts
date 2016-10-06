import {NgModule} from "@angular/core";
import {RouterModule} from "@angular/router";
import {ReactiveFormsModule, FormsModule} from "@angular/forms";
import {BrowserModule} from "@angular/platform-browser";
import {routes} from "./settings.routes";
import {SettingsComponent} from "./settings.component";

@NgModule({
  declarations: [
    SettingsComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forChild(routes),
    FormsModule,
    ReactiveFormsModule,
  ],
  providers: [

  ]
})
export class SettingsModule {
}
