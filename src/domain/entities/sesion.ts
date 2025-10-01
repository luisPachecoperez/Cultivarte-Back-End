export interface Sesion {
  id_sesion: string;
  id_actividad: string;
  fecha_actividad: Date | string; // YYYY-MM-DD
  hora_inicio: string; // HH:mm:ss
  hora_fin: string; // HH:mm:ss
  imagen: string;
  nro_asistentes: number;
  descripcion: string;
  id_creado_por: string;
  fecha_creacion: Date | string; // YYYY-MM-DD
  id_modificado_por: string;
  fecha_modificacion: Date | string; // YYYY-MM-DD
}
