import { Component } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'udistrital-list-registro-tirilla-noticias',
  templateUrl: './list-registro-tirilla-noticias.component.html',
  styleUrls: ['./list-registro-tirilla-noticias.component.scss']
})
export class ListRegistroTirillaNoticiasComponent {
  cardSize = 4;
  displayedColumns: string[] = ['prioridad', 'titulo', 'estilo', 'etiqueta', 'editar'];
  data = [
    { prioridad: 'A1', titulo: 'B1', estilo: 'C1', etiqueta: 'D1', editar: 'E1' },
    { prioridad: 'A2', titulo: 'B2', estilo: 'C2', etiqueta: 'D2', editar: 'E2' },
  ];

  dataSource = new MatTableDataSource(this.data);
  editingRowIndex: number | null = null; // Variable para rastrear la fila en edición
  editForm: FormGroup;

  constructor(private fb: FormBuilder) {
    this.editForm = this.fb.group({
      prioridad: [''],
      titulo: [''],
      estilo: [''],
      etiqueta: [''],
      editar: ['']
    });
  }

  agregarNoticia() {
    this.data.push({
      prioridad: '',
      titulo: '',
      estilo: '',
      etiqueta: '',
      editar: ''
    });

    this.dataSource.data = this.data;
  }

  editarFila(rowIndex: number) {
    this.editingRowIndex = rowIndex;
    const row = this.data[rowIndex];

    this.editForm.setValue(row);
  }

  guardarEdicion() {
    if (this.editingRowIndex !== null) {
      this.data[this.editingRowIndex] = this.editForm.value;

      this.editingRowIndex = null;
      this.editForm.reset();

      this.dataSource.data = this.data;
    }
  }
}
