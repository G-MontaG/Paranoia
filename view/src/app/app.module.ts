import {NgModule} from "@angular/core";
import {BrowserModule} from "@angular/platform-browser";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {HttpModule} from "@angular/http";
import {RouterModule} from "@angular/router";
import {routes} from "./app.routes";
import {NgSemanticModule} from "ng-semantic";
import {SuiModule} from 'ng2-semantic-ui/ng2-semantic-ui';
import {AppComponent} from "./app.component";
import {MenuComponent} from "./menu/menu.component";
import {MainViewComponent} from "./main-view/main-view.component";
import {FileEncryptionModule} from "./file-encryption/file-encryption.module";
import {KeyStorageModule} from "./key-storage/key-storage.module";
import {RsaModule} from "./rsa/rsa.module";
import {SettingsModule} from "./settings/settings.module";
import {AppConfigService} from "./services/app-config.service";
import {appConfig} from "./services/app-config.model";

let options = {
  autoDismiss: true,
  positionClass: 'toast-top-right',
};

export function createAppModule(arg: appConfig) {
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
      NgSemanticModule,
      //SuiModule,
      FileEncryptionModule,
      KeyStorageModule,
      RsaModule,
      SettingsModule
    ],
    bootstrap: [AppComponent],
    providers: [
      AppConfigService,
      {provide: 'config', useValue: arg},
    ]
  })
  class AppModule {
  }

  return AppModule;
}
