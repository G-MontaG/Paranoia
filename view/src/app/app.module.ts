import {NgModule} from "@angular/core";
import {BrowserModule} from "@angular/platform-browser";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {RouterModule} from "@angular/router";
import {routes} from "./app.routes";
import {NgSemanticModule} from "ng-semantic";
import {AppComponent} from "./app.component";
import {MenuComponent} from "./menu/menu.component";
import {MainViewComponent} from "./main-view/main-view.component";
import {FileEncryptionModule} from "./file-encryption/file-encryption.module";
import {KeyStorageModule} from "./key-storage/key-storage.module";
import {ConnectionModule} from "./connection/connection.module";
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
      RouterModule.forRoot(routes, {useHash: true}),
      ReactiveFormsModule,
      NgSemanticModule,
      //SuiModule,
      FileEncryptionModule,
      KeyStorageModule,
      ConnectionModule,
      SettingsModule
    ],
    exports: [
      RouterModule
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
