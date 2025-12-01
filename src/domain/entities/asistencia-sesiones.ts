export interface Nuevo {
  id_persona: string;
  id_asistencia: string;
  id_sesion: string;
}

export interface AsistenciaSesiones {
  id_actividad: string;
  id_sesion: string;
  imagen: string;
  numero_asistentes: number;
  descripcion: string;
  nuevos: Nuevo[];
}
