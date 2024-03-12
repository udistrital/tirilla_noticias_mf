
// Modelo para la Etiqueta
export interface Etiqueta {
  IdEtiqueta: number;
}
// Modelo para el Contenido
export interface Contenido {
  Dato: string;
  IdContenido: number;
}
// Modelo para la Etiqueta
export interface EtiquetaP {
  IdEtiqueta: number;
  Id:number;
}
// Modelo para el Contenido
export interface ContenidoP {
  Dato: string;
  IdContenido: number;
  Id:number;
}

// Modelo para el Id del modulo de publicación
export interface ModuloPublicacion {
  IdModulo : string[];
}

// Modelo para el envío completo
export interface EnvioNoticia {
  Prioridad: number;
  IdEstilo: number;
  FechaInicio: string;
  FechaFinal: string;
  Etiqueta: Etiqueta[];
  Contenido: Contenido[];
}

// Modelo para el envío completo
export interface PutNoticia {
  Prioridad: number;
  IdEstilo: number;
  Activo: boolean;
  Id: number;
  FechaInicio: string;
  FechaFinal: string;
  FechaCreacion: string;
  Etiqueta: EtiquetaP[];
  Contenido: ContenidoP[];
}
// Modelo para el envío completo

export interface NoticiaGet {
  Id: number;
  Activo: boolean;
  IdTipoEstilo: {
    Id: number;
  };
  IdTipoPrioridad: {
    Id: number;
  };
}

export interface listadoNoticias {
  Titulo: string;
  Prioridad: string;
  Estilo: string;
  Etiquetas: string[];
}

// // Modelo para recibir la noticia completa con etiquetas y contenido del backend

// export interface NoticiaResponse {
//   Noticia: NoticiaGet;
//   Etiquetas: EtiquetaGet[];
//   Contenido: ContenidoGet[];
// }

// export interface NoticiaGet {
//   Id: number;
//   Activo: boolean;
//   IdTipoEstilo: TipoEstilo;
//   IdTipoPrioridad: TipoPrioridad;
// }

// export interface EtiquetaGet {
//   Id: number;
//   Activo: boolean;
//   IdTipoEtiqueta: TipoEtiqueta;
// }

// export interface ContenidoGet {
//   Id: number;
//   Activo: boolean;
//   Dato: string;
//   IdTipoContenido: TipoContenido;
// }

// export interface TipoEstilo {
//   Id: number;
// }

// export interface TipoPrioridad {
//   Id: number;
// }

// export interface TipoEtiqueta {
//   Id: number;
// }

// export interface TipoContenido {
//   Id: number;
// }



// // modelo para listar la notica con titulo, estilo y etiquetas 

// export interface NoticiaList {
//   Titulo: string;
//   Prioridad: string;
//   Estilo: string;
//   Etiqueta: string[]; 
// }

// export interface Tipo_Contenido {
//   Id: number;
//   NombreContenido: string;
// }

