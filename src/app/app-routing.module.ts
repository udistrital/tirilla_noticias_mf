import { NgModule } from '@angular/core';
import { RouterModule, Routes, provideRouter } from '@angular/router';
import { APP_BASE_HREF } from '@angular/common';
import { getSingleSpaExtraProviders } from 'single-spa-angular';
import { provideHttpClient, withFetch } from '@angular/common/http';
import { AppComponent } from './app.component';
import { CrudTirillaNoticiasComponent } from './components/crud-tirilla-noticias/crud-tirilla-noticias.component';
import { ListTirillaNoticiasComponent } from './components/list-tirilla-noticias/list-tirilla-noticias.component';
import { CrudPublicacionTirillaNoticiasComponent } from './components/crud-publicacion-tirilla-noticias/crud-publicacion-tirilla-noticias.component';

const routes: Routes = [
  { path: "lista", component: ListTirillaNoticiasComponent },
  { path: "crear", component:  CrudTirillaNoticiasComponent},
  { path: "publicar", component:  CrudPublicacionTirillaNoticiasComponent},
  { path: "tirilla", component: AppComponent }];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [ 
    provideRouter(routes),
    { provide: APP_BASE_HREF, useValue: '/tirilla/' },
    getSingleSpaExtraProviders(),
    provideHttpClient(withFetch()) ]
})
export class AppRoutingModule { }