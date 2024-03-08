import { Component, ElementRef, EventEmitter, Output, ViewChild } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { MatTableDataSource } from '@angular/material/table';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { ListarNoticias, NoticiaGet, Etiqueta, Contenido } from 'src/app/models/noticiaCrud';
import { NoticiasService } from 'src/app/services/noticias.service';
import { forkJoin } from 'rxjs';

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

  public listaNoticiasCargada: boolean = false;
  @Output() dataSent = new EventEmitter<any>();

  cardSize = 4;
  source!: MatTableDataSource<any> 
  displayedColumns: string[] = ['titulo', 'activo', 'prioridad', 'estilo', 'etiqueta', 'editar'];
  
  editingRowIndex: number | null = null; // Variable para rastrear la fila en edición
  editForm: FormGroup;

  @ViewChild('etiquetaInput', { read: ElementRef }) etiquetaInput!: ElementRef<HTMLInputElement>;

  constructor(private fb: FormBuilder, private router: Router, private http: HttpClient, private noticiasService: NoticiasService) {
    this.editForm = this.fb.group({
      titulo: [''],
      activo: [''],
      prioridad: [''],
      estilo: [''],
      etiqueta: [''],
      editar: ['']
    });

  }

  ngOnInit(): void {

    // Espera a que todas las peticiones se completen
    forkJoin({
      etiquetas: this.http.get<any>(`${environment.TIRILLA_CRUD_SERVICE}/tipo_etiqueta`),
      estilos: this.http.get<any>(`${environment.TIRILLA_CRUD_SERVICE}/tipo_estilo`),
      prioridades: this.http.get<any>(`${environment.TIRILLA_CRUD_SERVICE}/tipo_prioridad`)
    }).subscribe(responses => {
      if (responses.etiquetas.Success) {
        this.etiquetas = responses.etiquetas.Data.map((etiqueta: any) => etiqueta);
      }
      if (responses.estilos.Success) {
        this.estilos = responses.estilos.Data.map((estilo: any) => estilo);
      }
      if (responses.prioridades.Success) {
        this.prioridades = responses.prioridades.Data.map((prioridad: any) => prioridad);
      }

      this.obtenerNoticias();
    });
  }

  agregarNoticia() {
    this.router.navigate(['/crear']);
  }

  editarFila(rowIndex: any) {
    this.noticiasService.enviarDatos(rowIndex);
    this.router.navigate(['/editar']);
  }


  obtenerNoticias() {
    this.http.get<any[]>(`${environment.TIRILLA_MID_SERVICE}/noticia-mid/lista`).subscribe(
      (response) => {
        this.noticiasGET = response.map((item: any) => {
          const noticia: NoticiaGet = {
            Id: item.Noticia.Id,
            Activo: item.Noticia.Activo,
            IdTipoEstilo: {
              Id: item.Noticia.IdTipoEstilo.Id
            },
            IdTipoPrioridad: {
              Id: item.Noticia.IdTipoPrioridad.Id
            }
          };

          const etiquetas: Etiqueta = {
            Activo: item.Etiquetas[0].Activo,
            IdNoticia: {
              Id: item.Etiquetas[0].IdNoticia.Id
            },
            IdTipoEtiqueta: item.Etiquetas[0].IdTipoEtiqueta.map((etiqueta: any) => etiqueta)
          };

          const contenido: Contenido = {
            Dato: item.Contenido[0].Dato.map((contenido: any) => contenido),
            Id: item.Contenido[0].Id.map((contenido: any) => JSON.parse(contenido))
          };
          const envioNoticia: ListarNoticias = {
            Noticia: noticia,
            Etiqueta: etiquetas,
            Contenido: contenido,
          };
          return envioNoticia;
        });
        this.construirListaNoticias();
      },
      (error) => {
        console.error('Error al obtener las noticias:', error);
      }
    );
  }

  construirListaNoticias() {  
    this.noticiasGET.forEach(noticia => {
      const Id = noticia.Noticia.Id;
      const activo = noticia.Noticia.Activo;
      const titulo = this.obtenerTitulo(noticia.Contenido);
      const descripcion = this.obtenerDescripcion(noticia.Contenido);
      const contenido = this.obtenerContenido(noticia.Contenido);
      const prioridad = this.obtenerPrioridad(noticia.Noticia.IdTipoPrioridad.Id);
      const estilo = this.obtenerEstilo(noticia.Noticia.IdTipoEstilo.Id);
      const etiquetas = this.obtenerNombresEtiquetas(noticia.Etiqueta.IdTipoEtiqueta);
  
      this.noticiasList.push({
        Id: Id,
        Activo: activo,
        Titulo: titulo,
        Descripcion: descripcion,
        Contenido: contenido,
        Prioridad: prioridad,
        Estilo: estilo,
        Etiquetas: etiquetas
      });
    });
    this.source = new MatTableDataSource(this.noticiasList);
  }
  
  
  obtenerPrioridad(id: number): string {
    const prioridadesObj = this.prioridades as unknown as { Id: number, NombrePrioridad: string }[];
    const prioridadEncontrada = prioridadesObj.find(prioridad => prioridad.Id === id);

    if (prioridadEncontrada) {
        return prioridadEncontrada.NombrePrioridad;
    } else {
        return "Prioridad no encontrada";
    }
}

obtenerTitulo(contenido: Contenido): any {
  for (let i = 0; i < contenido.Id.length; i++) {
      if (contenido.Id[i] === 1) {
          return contenido.Dato[i];
      }
  }
}

obtenerContenido(contenido: Contenido): any {
  for (let i = 0; i < contenido.Id.length; i++) {
      if (contenido.Id[i] === 3) {
          return contenido.Dato[i];
      }
  }
}

obtenerDescripcion(contenido: Contenido): any {
  for (let i = 0; i < contenido.Id.length; i++) {
      if (contenido.Id[i] === 2) {
          return contenido.Dato[i];
      }
  }
}
  
obtenerEstilo(id: number): string {
  const estilosObj = this.estilos as unknown as { Id: number, NombreEstilo: string }[];

  const estiloEncontrado = estilosObj.find(estilo => estilo.Id === id);

  if (estiloEncontrado) {
      return estiloEncontrado.NombreEstilo;
  } else {
      return "Estilo no encontrado";
  }
}
  
obtenerNombresEtiquetas(ids: number[]): string[] {
  const nombresEtiquetas: string[] = [];
  const etiquetasObj = this.etiquetas as unknown as { Id: number, NombreEtiqueta: string, Activo: boolean }[];

  // Verificar si ids es un array
  if (Array.isArray(ids)) {
    ids.forEach(id => {
      const etiquetaEncontrada = etiquetasObj.find(etiqueta => etiqueta.Id === id);
      if (etiquetaEncontrada) {
          nombresEtiquetas.push(etiquetaEncontrada.NombreEtiqueta);
      }
    });
  }

  return nombresEtiquetas;
}

}
