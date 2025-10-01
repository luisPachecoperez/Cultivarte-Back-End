export interface Asistencia {
  id_asistencia: string; // UUID
  id_sesion: string; // UUID
  id_persona?: string | null; // UUID opcional
  id_creado_por?: string | null; // UUID opcional
  fecha_creacion?: string | null; // ISO Date
  id_modificado_por?: string | null; // UUID opcional
  fecha_modificacion?: string | null; // ISO Date
}
