// Modelo para la Noticia
export interface Noticia {
  Activo: boolean;
  IdTipoEstilo: {
    Id: number;
  };
  IdTipoPrioridad: {
    Id: number;
  };
}

// Modelo para la Etiqueta
export interface Etiqueta {
  Activo: boolean;
  IdNoticia: {
    Id: number | null;
  };
  IdTipoEtiqueta: number[];
}

// Modelo para el Contenido
export interface Contenido {
  Id: number[];
  Dato: string[];
}

// Modelo para el Id del modulo de publicación
export interface ModuloPublicacion {
  IdModulo : string[];
}

// Modelo para el envío completo
export interface EnvioNoticia {
  Noticia: Noticia;
  Etiqueta: Etiqueta;
  Contenido: Contenido;
  ModuloPublicacion: ModuloPublicacion;
}