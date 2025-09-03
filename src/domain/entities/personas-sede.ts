export interface PersonasSede {
    id_personas_sede    : string;   // UUID
    id_persona          : string;         // UUID
    id_sede             : string;            // UUID
    id_creado_por       : string | null;
    fecha_creacion      : string | null;       // ISO date
    id_modificado_por   : string | null;
    fecha_modificacion  : string | null;   // ISO date
  }
  