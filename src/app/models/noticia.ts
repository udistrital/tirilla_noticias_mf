export class Noticia {
  constructor(
    public activo: boolean,
    public descripcion: string,
    public estilo: number,
    public link: string,
    public prioridad: number,
    public titulo: string,
    public etiqueta: number
  ) {}
}
  