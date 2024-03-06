import { Component, ElementRef, EventEmitter, Output, ViewChild } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { MatTableDataSource } from '@angular/material/table';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { ListarNoticias, NoticiaGet, Etiqueta, Contenido} from 'src/app/models/noticiaCrud';
import { NoticiasService } from 'src/app/services/noticias.service';
import { forkJoin } from 'rxjs';
import { Noticia } from 'src/app/models/noticia';

export interface PeriodicElement {
  name: string;
  position: number;
  weight: number;
  symbol: string;
}

const ELEMENT_DATA: PeriodicElement[] = [
  {position: 1, name: 'Hydrogen', weight: 1.0079, symbol: 'H'},
  {position: 2, name: 'Helium', weight: 4.0026, symbol: 'He'},
  {position: 3, name: 'Lithium', weight: 6.941, symbol: 'Li'},
  {position: 4, name: 'Beryllium', weight: 9.0122, symbol: 'Be'},
  {position: 5, name: 'Boron', weight: 10.811, symbol: 'B'},
  {position: 6, name: 'Carbon', weight: 12.0107, symbol: 'C'},
  {position: 7, name: 'Nitrogen', weight: 14.0067, symbol: 'N'},
  {position: 8, name: 'Oxygen', weight: 15.9994, symbol: 'O'},
  {position: 9, name: 'Fluorine', weight: 18.9984, symbol: 'F'},
  {position: 10, name: 'Neon', weight: 20.1797, symbol: 'Ne'},
];

@Component({
  selector: 'udistrital-list-tirilla-noticias',
  templateUrl: './list-tirilla-noticias.component.html',
  styleUrls: ['./list-tirilla-noticias.component.scss']
})
export class ListTirillaNoticiasComponent{
  noticiasGET: ListarNoticias[] = [];
  noticiasList: any[] = [];
  etiquetas: string[] = [];
  estilos: string[] = [];
  prioridades: string[] = [];
  //noticias: Noticia[] = [];
  dataSource: Noticia[] = [];

  

  public listaNoticiasCargada: boolean = false;
  @Output() dataSent = new EventEmitter<any>();

  cardSize = 4;
  displayedColumns: string[] = ['titulo', 'activo', 'prioridad', 'estilo', 'etiqueta', 'editar'];

  //dataSource = ELEMENT_DATA;
  
  editingRowIndex: number | null = null; // Variable para rastrear la fila en edición

  @ViewChild('etiquetaInput', { read: ElementRef }) etiquetaInput!: ElementRef<HTMLInputElement>;

  constructor( private router: Router, private http: HttpClient, private noticiasService: NoticiasService) {


  }


  ngOnInit(): void {
      this.obtenerNoticias();
  }

  agregarNoticia() {
    this.router.navigate(['/crear']);
  }

  editarFila(rowIndex: any) {
    this.noticiasService.enviarDatos(rowIndex);
    this.router.navigate(['/editar']);
  }


  obtenerNoticias() {
    this.http.get<any>(`${environment.TIRILLA_MID_SERVICE}/noticia-mid/lista`).subscribe(
      (response) => {
        console.log(response);
        this.dataSource = response.data
        console.log("Noticias:", this.dataSource);
      },
      (error) => {
        console.error('Error al obtener las noticias:', error);
      }
    );
  }
  
}



