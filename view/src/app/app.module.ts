import {NgModule} from "@angular/core";
import {BrowserModule} from "@angular/platform-browser";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {HttpModule} from "@angular/http";
import {RouterModule} from "@angular/router";
import {routes} from "./app.routes";
import {AppComponent} from "./app.component";
import {MenuComponent} from "./menu/menu.component";
import {MainViewComponent} from "./main-view/main-view.component";

let options = {
  autoDismiss: true,
  positionClass: 'toast-top-right',
};

@NgModule({
  declarations: [
    AppComponent,
    MenuComponent,
    MainViewComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    RouterModule.forRoot(routes, {useHash: true}),
    ReactiveFormsModule,
  ],
  bootstrap: [AppComponent],
  providers: [

  ]
})
export class AppModule {
}
