import {NgModule} from "@angular/core";
import {BrowserModule} from "@angular/platform-browser";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {HttpModule} from "@angular/http";
import {RouterModule} from "@angular/router";
import {routes} from "./app.routes";
import {SuiModule} from 'ng2-semantic-ui/ng2-semantic-ui';
import {AppComponent} from "./app.component";
import {MenuComponent} from "./menu/menu.component";
import {MainViewComponent} from "./main-view/main-view.component";
import {FileEncryptionModule} from "./file-encryption/file-encryption.module";

let options = {
  autoDismiss: true,
  positionClass: 'toast-top-right',
};

@NgModule({
  declarations: [
    AppComponent,
    MenuComponent,
    MainViewComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    RouterModule.forRoot(routes, {useHash: true}),
    ReactiveFormsModule,
    SuiModule,
    FileEncryptionModule
  ],
  bootstrap: [AppComponent],
  providers: [

  ]
})
export class AppModule {
}
