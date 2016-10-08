import {NgModule} from "@angular/core";
import {RouterModule} from "@angular/router";
import {routes} from "./connection.routes";
import {ConnectionComponent} from "./connection.component";

@NgModule({
  declarations: [
    ConnectionComponent
  ],
  imports: [
    RouterModule.forChild(routes)
  ],
  providers: [

  ]
})
export class ConnectionModule {
}
