import { Persona } from './persona';

export interface EditarBeneficiarios {
  id_programa: string;
  id_grupo_interes: string;
  nuevos: Persona[];
  modificados: Persona[];
  eliminados: EliminarBeneficiarios[];
}

export interface EliminarBeneficiarios {
  id_persona: string;
}
