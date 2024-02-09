import {Component} from '@angular/core';
import {ThemePalette} from '@angular/material/core';
import {FormsModule} from '@angular/forms';
import {NgFor} from '@angular/common';
import {MatCheckboxModule} from '@angular/material/checkbox';
import { Noticia } from 'src/app/models/noticia';

export interface Task {
  name: string;
  completed: boolean;
  color: ThemePalette;
  subtasks?: Task[];
}
@Component({
  selector: 'udistrital-crud-publicacion-tirilla-noticias',
  templateUrl: './crud-publicacion-tirilla-noticias.component.html',
  styleUrls: ['./crud-publicacion-tirilla-noticias.component.scss']
})
export class CrudPublicacionTirillaNoticiasComponent {

  //estructura unificada
  noticias: Noticia[] = [];
  
  //metodos extraidos de: https://v16.material.angular.io/components/checkbox/overview
  task: Task = {
    name: 'Todos los sistemas',
    completed: false,
    color: 'primary',
    subtasks: [
      {name: 'SGA', completed: false, color: 'primary'},
      {name: 'Planeación', completed: false, color: 'primary'},
      {name: 'Otro', completed: false, color: 'primary'},
    ],
  };

  allComplete: boolean = false;

  updateAllComplete() {
    this.allComplete = this.task.subtasks != null && this.task.subtasks.every(t => t.completed);
  }

  someComplete(): boolean {
    if (this.task.subtasks == null) {
      return false;
    }
    return this.task.subtasks.filter(t => t.completed).length > 0 && !this.allComplete;
  }

  setAll(completed: boolean) {
    this.allComplete = completed;
    if (this.task.subtasks == null) {
      return;
    }
    this.task.subtasks.forEach(t => (t.completed = completed));
  }
}
