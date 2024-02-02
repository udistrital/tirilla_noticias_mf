import { APP_BASE_HREF } from "@angular/common";
import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { AppComponent } from "./app.component";
import { ListRegistroTirillaNoticiasComponent } from "./components/list-registro-tirilla-noticias/list-registro-tirilla-noticias.component";
import { CrudTirillaNoticiasComponent } from "./components/crud-tirilla-noticias/crud-tirilla-noticias.component";


const routes: Routes = [
  { path: "lista", component: ListRegistroTirillaNoticiasComponent },
  { path: "crear", component:  CrudTirillaNoticiasComponent},
  { path: "tirilla", component: AppComponent }];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [{ provide: APP_BASE_HREF, useValue: "/tirilla/" }],
})
export class AppRoutingModule {}
