import { Component, ElementRef, EventEmitter, Output, ViewChild } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { MatTableDataSource } from '@angular/material/table';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { NoticiaGet, Etiqueta, Contenido} from 'src/app/models/noticiaCrud';
import { NoticiasService } from 'src/app/services/noticias.service';
import { forkJoin } from 'rxjs';
import { Noticia } from 'src/app/models/noticia';

@Component({
  selector: 'udistrital-list-tirilla-noticias',
  templateUrl: './list-tirilla-noticias.component.html',
  styleUrls: ['./list-tirilla-noticias.component.scss']
})
export class ListTirillaNoticiasComponent{
  //noticiasGET: ListarNoticias[] = [];
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

  editarFila(data: any) {
    console.log(data)
    this.noticiasService.enviarDatos(data); 
    this.router.navigate(['/editar']); 
}


  obtenerNoticias() {
    this.http.get<any>(`${environment.TIRILLA_MID_SERVICE}/noticia-mid/`).subscribe(
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



