import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CrudTirillaNoticiasComponent } from './components/crud-tirilla-noticias/crud-tirilla-noticias.component';
import { ListTirillaNoticiasComponent } from './components/list-tirilla-noticias/list-tirilla-noticias.component';
import { CrudPublicacionTirillaNoticiasComponent } from './components/crud-publicacion-tirilla-noticias/crud-publicacion-tirilla-noticias.component';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import { MatTableModule } from '@angular/material/table';
import { MatSelectModule } from '@angular/material/select';
import { MatSortModule } from '@angular/material/sort'
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import {MAT_DIALOG_DATA, MatDialogModule, MatDialogRef} from '@angular/material/dialog';
import { MatPaginatorModule } from '@angular/material/paginator';
import {MatTabsModule} from '@angular/material/tabs';
import { MatFormFieldModule } from '@angular/material/form-field';

import { ReactiveFormsModule } from '@angular/forms';
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatChipsModule } from '@angular/material/chips';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatRadioModule } from '@angular/material/radio';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { EditarTirillaNoticiasComponent } from './components/editar-tirilla-noticias/editar-tirilla-noticias.component';
import { VerTirillaNoticiasComponent } from './components/ver-tirilla-noticias/ver-tirilla-noticias.component';


@NgModule({
  declarations: [
    AppComponent,
    CrudTirillaNoticiasComponent,
    ListTirillaNoticiasComponent,
    CrudPublicacionTirillaNoticiasComponent,
    EditarTirillaNoticiasComponent,
    VerTirillaNoticiasComponent
  ],
  imports: [
    MatTabsModule,
    MatChipsModule,
    MatCheckboxModule,
    MatAutocompleteModule,
    BrowserModule,
    MatRadioModule,
    MatCardModule,
    MatFormFieldModule,
    MatSnackBarModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    MatDatepickerModule,
    MatProgressSpinnerModule,
    MatNativeDateModule,
    MatTableModule, 
    MatPaginatorModule,
    MatDialogModule,
    ReactiveFormsModule,
    FormsModule,
    MatSelectModule,
    BrowserAnimationsModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }