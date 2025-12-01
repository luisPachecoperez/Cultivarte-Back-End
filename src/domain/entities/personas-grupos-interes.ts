export interface PersonaGrupoInteres {
  id_persona_grupo_interes: string; // UUID
  id_persona: string; // UUID
  id_grupo_interes: string; // UUID

  id_creado_por?: string | null;
  fecha_creacion?: string | null; // ISO date
  id_modificado_por?: string | null;
  fecha_modificacion?: string | null; // ISO date
}
