export interface SedeInfo {
  id_sede: string;
  nombre: string;
}

export interface TipoIdentificacionInfo {
  id_tipo_identificacion: string;
  nombre: string;
}

export interface TipoPersonaInfo {
  // Corregido de id_tipo_identificacion a id_tipo_persona
  id_tipo_persona: string;
  nombre: string;
}

export interface SexoInfo {
  id_sexo: string;
  nombre: string;
}

export interface UbicacionInfo {
  id_ubicacion: string;
  nombre: string;
}

export interface PaisInfo {
  id_pais: string;
  nombre: string;
}

export interface PreBeneficiario {
  id_programa: string;
  id_grupo_interes: string;
  sedes: SedeInfo[];
  paises: PaisInfo[];
  tiposIdentificacion: TipoIdentificacionInfo[];
  tiposPersona: TipoPersonaInfo[];
  sexo: SexoInfo[];
  ubicaciones: UbicacionInfo[];
}
