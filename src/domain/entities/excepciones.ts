export interface ExcepcionModificable {
  id_excepcion?: number; // Es opcional para nuevos, pero requerido para modificados.
  error: string;
  mensaje: string;
  id_creado_por?: string; // UUID opcional
  fecha_creacion?: string; // ISO Date opcional
  fecha_modificacion?: string; // ISO Date opcional
}

export interface ExcepcionEliminable {
  id_excepcion: number; // Se necesita el ID para el borrado.
}

export interface EditarExcepciones {
  nuevos: ExcepcionModificable[];
  modificados: ExcepcionModificable[];
  eliminados: ExcepcionEliminable[];
}
