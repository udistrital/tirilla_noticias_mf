import { HttpClient } from '@angular/common/http';
import { Component, ElementRef, ViewChild } from '@angular/core';
import { Noticia } from 'src/app/models/noticia';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'udistrital-ver-tirilla-noticias',
  templateUrl: './ver-tirilla-noticias.component.html',
  styleUrls: ['./ver-tirilla-noticias.component.scss']
})
export class VerTirillaNoticiasComponent {
  noticias: Noticia[] = [];

  @ViewChild('etiquetaInput', { read: ElementRef }) etiquetaInput!: ElementRef<HTMLInputElement>;
  constructor(private http: HttpClient) { }

  ngOnInit(): void {

    this.obtenerNoticias();

    this.noticias.sort((a, b) => a.prioridad - b.prioridad);
  }

  obtenerNoticias() {
    this.http.get<any>(`${environment.TIRILLA_MID_SERVICE}/noticia-mid`).subscribe(
      (response) => {
        console.log(response);
        this.noticias = response.data.map((item: any) => {
          const { activo, descripcion, estilo, link, prioridad, titulo, etiqueta } = item;
          return new Noticia(activo, descripcion, estilo, link, prioridad, titulo, etiqueta);
        });
        console.log("Noticias:", this.noticias);
      },
      (error) => {
        console.error('Error al obtener las noticias:', error);
      }
    );
  }

}
