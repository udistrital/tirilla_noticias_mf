import { Component } from '@angular/core';
import { Noticia } from 'src/app/models/noticia';

@Component({
  selector: 'udistrital-ver-tirilla-noticias',
  templateUrl: './ver-tirilla-noticias.component.html',
  styleUrls: ['./ver-tirilla-noticias.component.scss']
})
export class VerTirillaNoticiasComponent {
  noticias: Noticia[] = [
    {
      id: '1',
      titulo: 'Título de la noticia 1',
      link: 'https://ejemplo.com/noticia1',
      sistemas: ['Sistema1' , 'Sistema2'],
      etiquetas: ['etiqueta1', 'etiqueta2' ],
      descripcion: 'Descripción de la noticia 1',
      multimedia: ['imagen1.jpg' , 'video1.mp4'],
      estilo: 'estilo1',
      prioridad: 2 ,
      fechaCreacion:  new Date('2023-01-02'), 
      fechaModificacion:  new Date('2023-01-02'),
    },
    {
      id: '2',
      titulo: 'Título de la noticia 2',
      link: 'https://ejemplo.com/noticia2',
      sistemas: ['Sistema3' ],
      etiquetas: ['etiqueta3' , 'etiqueta4' ],
      descripcion: 'Descripción de la noticia 2',
      multimedia: ['imagen2.jpg' ],
      estilo: 'estilo2',
      prioridad: 1 ,
      fechaCreacion:  new Date('2023-01-01'), 
      fechaModificacion:  new Date('2023-01-01'), 
    },
    {
      id: '3',
      titulo: 'Título de la noticia 3',
      link: 'https://ejemplo.com/noticia3',
      sistemas: ['Sistema3' ],
      etiquetas: ['etiqueta3' , 'etiqueta4' ],
      descripcion: 'Descripción de la noticia 3',
      multimedia: ['imagen3.jpg' ],
      estilo: 'estilo2',
      prioridad: 1,
      fechaCreacion:  new Date('2023-01-03'), 
      fechaModificacion:  new Date('2023-01-03'),
    }

  ];

  ngOnInit(): void {

    this.noticias.sort((a, b) => {
      if (a.prioridad !== b.prioridad) {
        return a.prioridad - b.prioridad; 
      } else {
        return b.fechaModificacion.getTime() - a.fechaModificacion.getTime(); // Ordena por fecha de modificación, se asume que es más nueva
      }
    });
  }

  constructor() { }

}
