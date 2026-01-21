// NOSONAR

import { Persona, RespuestaGrap } from '../';
import { PreBeneficiario } from '../entities/beneficiario';
import { EditarBeneficiarios } from '../entities/Editar-beneficiarios';

export interface PersonaDataSource {
  getAll(limit: number, offset: number): Promise<Persona[] | RespuestaGrap>;
  getById(id_persona: string): Promise<Persona | RespuestaGrap>;
  getAliadosSede(id_usuario: string): Promise<Persona[] | RespuestaGrap>;
  getBenSedes(): Promise<Persona[] | RespuestaGrap>;
  getBeneficiarios(): Promise<Persona[] | RespuestaGrap>;
  getPreBeneficiarios(
    id_usuario: string,
  ): Promise<PreBeneficiario[] | RespuestaGrap>;
  getPersonasParams(
    id_sede: string,
    id_programa: string,
    id_grupo_interes: string,
    limit: number,
    offset: number,
  ): Promise<Persona[] | RespuestaGrap>;
  getPersonaByTipoIdenficacionNumeroIdentificacion(
    id_tipo_identificacion: string,
    identificacion: string,
  ): Promise<Persona | RespuestaGrap>;
  createPersona(persona: Persona): Promise<Persona | RespuestaGrap>;
  updatePersona(
    id_persona: string,
    persona: Persona,
  ): Promise<Persona | RespuestaGrap>;
  updateBeneficiarios(
    editarBeneficiarios: EditarBeneficiarios,
  ): Promise<RespuestaGrap>;
  deletePersona(id_persona: string): Promise<RespuestaGrap>;
}
