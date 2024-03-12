import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSelectModule } from '@angular/material/select';
import { Router } from '@angular/router';
import { ENTER, COMMA } from '@angular/cdk/keycodes';
import { FormControl } from '@angular/forms';

import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { MatChipInputEvent } from '@angular/material/chips';
import { MatSnackBar } from '@angular/material/snack-bar';
import { startWith, map, Observable, switchMap } from 'rxjs';
import { Noticia } from 'src/app/models/noticia';
import { EnvioNoticia } from 'src/app/models/noticiaCrud';

import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { isDataSource } from '@angular/cdk/collections';

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
  allEtiquetas: any[] = [];
  etiquetas: any[] = [];
  //este valor esta temporalmente quemado hasta la implementación con parametros_crud
  estilos: number[] = [1, 2];
  prioridades: number[] = [1, 2, 3, 4, 5];
  ids: any;

  chipGrid: any;

  // seleccion de archivo multimedia
  selectedFile: File | null = null;
  imageBase64: string | null = null;

  @ViewChild('etiquetaInput', { read: ElementRef }) etiquetaInput!: ElementRef<HTMLInputElement>;

  constructor(private formBuilder: FormBuilder, private router: Router, private snackBar: MatSnackBar, private http: HttpClient) {
    this.nuevaTirilla = this.formBuilder.group({
      titulo: ['', Validators.required],
      prioridad: ['', Validators.required],
      enlace: ['', Validators.required],
      descripcion: ['', Validators.required],
      estilo: ['', Validators.required]
    });
    this.cargarEtiquetas();
    this.filtroEtiquetas = this.etiquetaCtrl.valueChanges.pipe(
      startWith(null),
      switchMap(() => this.cargarEtiquetas()),
      map((ids: string[]) => ids)
    );
    //this.allEtiquetas = ['oati', 'sga', 'bienestar', 'rectoría', 'acádemica'];
  }

  ngOnInit(): void {
    this.nuevaTirilla = this.formBuilder.group({
      titulo: [''],
      prioridad: [''],
      enlace: [''],
      descripcion: [''],
      estilo: ['']
    });

    this.cargarEtiquetas();
  }

  cargarEtiquetas(): Promise<any[]> {
    return new Promise((resolve, reject) => {
      this.http.get<any>(`${environment.TIRILLA_CRUD_SERVICE}/noticia_etiqueta/`).subscribe(
        (response) => {
          console.log(response);
          const ids = response.map((etiqueta: { IdEtiqueta: any; }) => etiqueta.IdEtiqueta.toString());
          console.log(ids);
          resolve(ids);
        },
        (error) => {
          console.error('Error al obtener las noticias:', error);
          reject(error);
        }
      );
    });
  }

  separatorKeysCodes: number[] = [ENTER, COMMA];
  etiquetaCtrl = new FormControl();
  filtroEtiquetas: Observable<string[]>;


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

  onFileSelected(event: any) {
    const file: File = event.target.files[0];
    // Verificar si se seleccionó un archivo
    if (file) {
      // Verificar si el tipo de archivo es una imagen
      if (file.type.match(/image\/*/) === null) {
        // Mostrar un mensaje de error si el archivo seleccionado no es una imagen
        this.snackBar.open('Por favor, selecciona una imagen.', 'Cerrar', {
          duration: 3000,
        });
        // Reiniciar el valor del input de archivo
        event.target.value = '';
      } else {
        // Si es una imagen, continuar con la conversión a base64
        this.selectedFile = file;
        this.convertToBase64(file);
      }
    }
  }


  convertToBase64(file: File) {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      this.imageBase64 = reader.result as string;
    };
  }

  guardar() {

    const nuevaNoticia: EnvioNoticia = {
      Prioridad: this.nuevaTirilla.value.prioridad,
      IdEstilo: this.nuevaTirilla.value.estilo,
      FechaInicio: "2024-03-07T12:11:16.7665693-05:00",
      FechaFinal: "2024-03-07T12:11:16.7665693-05:00",
      Contenido: [
        {
          Dato: "{\"dato\": \"" + this.nuevaTirilla.value.titulo + "\"}",
          //este valor esta temporalmente quemado hasta la implementación con parametros_crud
          IdContenido: 1
        },
        {
          Dato: "{\"dato\": \"" + this.nuevaTirilla.value.descripcion + "\"}",
          //este valor esta temporalmente quemado hasta la implementación con parametros_crud
          IdContenido: 2
        },
        {
          Dato: "{\"dato\": \"" + this.nuevaTirilla.value.link + "\"}",
          //este valor esta temporalmente quemado hasta la implementación con parametros_crud
          IdContenido: 3
        }/*, 
        {
          Dato: "{\"dato\": \"" + this.imageBase64 + "\"}",
          IdContenido: 4
        }*/
      ],
      Etiqueta: [
        {
          IdEtiqueta: 1
        }
      ],
    };

    this.http.post<any>(`${environment.TIRILLA_MID_SERVICE}/noticia-mid/`, nuevaNoticia).subscribe(
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
