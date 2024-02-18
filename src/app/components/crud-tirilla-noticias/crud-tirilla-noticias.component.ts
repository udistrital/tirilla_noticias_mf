import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSelectModule } from '@angular/material/select';
import { Router } from '@angular/router';
import { ENTER, COMMA } from '@angular/cdk/keycodes';
import { FormControl } from '@angular/forms';

import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { MatChipInputEvent } from '@angular/material/chips';
import { MatSnackBar } from '@angular/material/snack-bar';
import { startWith, map, Observable } from 'rxjs';
import { Noticia } from 'src/app/models/noticia';
import { EnvioNoticia } from 'src/app/models/noticiaCrud';

import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment'; 

@Component({
  selector: 'udistrital-crud-tirilla-noticias',
  templateUrl: './crud-tirilla-noticias.component.html',
  styleUrls: ['./crud-tirilla-noticias.component.scss']
})
export class CrudTirillaNoticiasComponent {

  //estructura unificada
  noticias: Noticia[] = [];
  nuevaTirilla: FormGroup;

  //arrays donde se guarda el contenido de las peticiónes get
  allEtiquetas: string[] = [];
  etiquetas: string[] = [];
  estilos: string[] = [];
  prioridades: string[] = [];

  @ViewChild('etiquetaInput', { read: ElementRef }) etiquetaInput!: ElementRef<HTMLInputElement>;

  constructor(private formBuilder: FormBuilder, private router: Router, private snackBar: MatSnackBar, private http: HttpClient) {
    this.nuevaTirilla = this.formBuilder.group({
      titulo: ['', Validators.required],
      prioridad: ['', Validators.required],
      enlace: ['', Validators.required],
      descripcion: ['', Validators.required],
      estilo: ['', Validators.required]
    });
    this.filtroEtiquetas = this.etiquetaCtrl.valueChanges.pipe(
      startWith(null),
      map((etiqueta: string | null) => (etiqueta ? this._filter(etiqueta) : this.allEtiquetas.slice())),
    );
  }

  ngOnInit(): void {
    this.nuevaTirilla = this.formBuilder.group({
      titulo: [''],
      prioridad: [''],
      enlace: [''],
      descripcion: [''],
      estilo: ['']
    });

    this.http.get<any>(`${environment.TIRILLA_CRUD_SERVICE}/tipo_etiqueta`).subscribe(response => {
      if (response.Success) {
        this.allEtiquetas = response.Data.map((etiqueta: any) => etiqueta.NombreEtiqueta);
        if (this.allEtiquetas.length > 0) {
          this.etiquetas = [this.allEtiquetas[0]]; 
        }
      }
    });

    this.http.get<any>(`${environment.TIRILLA_CRUD_SERVICE}/tipo_estilo`).subscribe(response => {
      if (response.Success) {
        this.estilos = response.Data.map((estilo: any) => estilo.NombreEstilo);
      }
    });

    this.http.get<any>(`${environment.TIRILLA_CRUD_SERVICE}/tipo_prioridad`).subscribe(response => {
      if (response.Success) {
        this.prioridades = response.Data.map((prioridad: any) => prioridad.NombrePrioridad);
      }
    });
  }

  separatorKeysCodes: number[] = [ENTER, COMMA];
  etiquetaCtrl = new FormControl();
  filtroEtiquetas: Observable<string[]>;
  //allEtiquetas: string[] = ['oati', 'sga', 'bienestar', 'rectoría', 'acádemica'];

  remove(etiqueta: string): void {
    const index = this.etiquetas.indexOf(etiqueta);

    if (index >= 0) {
      this.etiquetas.splice(index, 1);
    }
  }

  add(event: MatChipInputEvent): void {
    const value = (event.value || '').trim();

    if (value) {
      this.etiquetas.push(value);
    }

    event.chipInput!.clear();

    this.etiquetaCtrl.setValue(null);
  }

  selected(event: MatAutocompleteSelectedEvent): void {
    this.etiquetas.push(event.option.viewValue);
    //this.etiquetaInput.nativeElement.value = '';
    this.etiquetaCtrl.setValue(null);
  }

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();

    return this.allEtiquetas.filter(etiqueta => etiqueta.toLowerCase().includes(filterValue));
  }

  cargarArchivos() {
    // Lógica para cargar archivos multimedia(?)

    this.snackBar.open('Archivos cargados exitosamente', 'Cerrar', {
      duration: 3000,
    });
  }

  guardar() {

    const nuevaNoticia: EnvioNoticia = {
      Noticia: {
        Activo: true,
        IdTipoEstilo: {
          Id: this.estilos.indexOf(this.nuevaTirilla.value.estilo) + 1
        },
        IdTipoPrioridad: {
          Id: this.prioridades.indexOf(this.nuevaTirilla.value.prioridad) + 1
        }
      },
      Etiqueta: {
        Activo: true,
        IdNoticia: {
          Id: null
        },
        IdTipoEtiqueta: this.etiquetas.map(etiqueta => this.allEtiquetas.indexOf(etiqueta) + 1)
      },
      Contenido: {
        Id: [1,2,3],
        Dato: [this.nuevaTirilla.value.titulo, this.nuevaTirilla.value.descripcion, this.nuevaTirilla.value.enlace]
      },
      ModuloPublicacion: {
        IdModulo: ["1","2"] // este dato esta quemado para que funcione
      }
    };

    this.http.post<any>(`${environment.TIRILLA_MID_SERVICE}noticia-mid/`, nuevaNoticia).subscribe(
      response => {
        console.log('Noticia guardada exitosamente:', response);
        this.snackBar.open('Noticia guardada exitosamente', 'Cerrar', {
          duration: 3000,
        });
        this.router.navigate(['/lista']);
    },
      error => {
        console.error('Error al guardar la noticia:', error);
        this.snackBar.open('Error al guardar la noticia', 'Cerrar', {
          duration: 3000,
        });
      }
    );
  }
}
