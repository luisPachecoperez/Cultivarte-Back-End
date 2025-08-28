export interface PreAsistencia {
  id_actividad:             string;
  id_sesion:             string;
  id_sede:               string;
  numero_asistentes:     number;
  foto:                  string;
  imagen:                string;
  sedes:                 Sede[];
  beneficiarios:         Beneficiario[];
  asistentes_sesiones:   AsistenteSesion[];
}
  
export interface Sede {
  id_sede:               string;
  nombre_sede:           string;
}

export interface Beneficiario {
  id_persona:            string;
  nombre_completo:       string;
  id_sede:               string;
}

export interface AsistenteSesion {
  id_persona:            string;
}
  