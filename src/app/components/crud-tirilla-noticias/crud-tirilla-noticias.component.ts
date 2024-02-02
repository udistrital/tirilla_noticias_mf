import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSelectModule } from '@angular/material/select';
import { Router } from '@angular/router';
import { ENTER, COMMA } from '@angular/cdk/keycodes';
import { FormControl } from '@angular/forms';
import {Observable, map, startWith} from 'rxjs';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { MatChipInputEvent } from '@angular/material/chips';
import { MatSnackBar } from '@angular/material/snack-bar';


@Component({
  selector: 'udistrital-crud-tirilla-noticias',
  templateUrl: './crud-tirilla-noticias.component.html',
  styleUrls: ['./crud-tirilla-noticias.component.scss']
})
export class CrudTirillaNoticiasComponent implements OnInit{
  nuevaTirilla: FormGroup;

  @ViewChild('etiquetaInput', { read: ElementRef }) etiquetaInput!: ElementRef<HTMLInputElement>; 

  constructor(private formBuilder: FormBuilder, private router: Router, private snackBar: MatSnackBar) {
    this.nuevaTirilla = this.formBuilder.group({
      titulo: ['', Validators.required],
      prioridad: ['', Validators.required],
      enlace: ['', Validators.required],
      descripcion: ['', Validators.required]
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
    });
  }

  separatorKeysCodes: number[] = [ENTER, COMMA];

  etiquetaCtrl = new FormControl();
  filtroEtiquetas: Observable<string[]>;
  etiquetas: string[] = ['oati'];
  allEtiquetas: string[] = ['oati', 'sga', 'bienestar', 'rectoría', 'acádemica'];  // Define el tipo de datos correctamente

  remove(fruit: string): void {
    const index = this.etiquetas.indexOf(fruit);

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
    this.etiquetaInput.nativeElement.value = '';
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
    console.log(this.nuevaTirilla.value);
    this.snackBar.open('Noticia guardada existosamente', 'Cerrar', {
      duration: 3000,
    });
  }
}
