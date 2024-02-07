import { Component } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'udistrital-list-tirilla-noticias',
  templateUrl: './list-tirilla-noticias.component.html',
  styleUrls: ['./list-tirilla-noticias.component.scss']
})
export class ListTirillaNoticiasComponent {
  cardSize = 4;
  displayedColumns: string[] = ['prioridad', 'titulo', 'estilo', 'etiqueta', 'editar'];
  data = [
    { prioridad: 'A1', titulo: 'B1', estilo: 'C1', etiqueta: 'D1', editar: 'E1' },
    { prioridad: 'A2', titulo: 'B2', estilo: 'C2', etiqueta: 'D2', editar: 'E2' },
  ];

  dataSource = new MatTableDataSource(this.data);
  editingRowIndex: number | null = null; // Variable para rastrear la fila en edición
  editForm: FormGroup;

  constructor(private fb: FormBuilder, private router: Router) {
    this.editForm = this.fb.group({
      prioridad: [''],
      titulo: [''],
      estilo: [''],
      etiqueta: [''],
      editar: ['']
    });
  }

  agregarNoticia() {
    this.router.navigate(['/crear']);
  }

  editarFila(rowIndex: number) {
    this.editingRowIndex = rowIndex;
    const row = this.data[rowIndex];

    this.editForm.setValue(row);
    this.router.navigate(['/editar']);
  }
}
