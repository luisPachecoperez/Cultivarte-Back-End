import { Persona, RespuestaGrap } from '../';
// NOSONAR
export interface PersonaRepository {
  getAll(limit: number, offset: number): Promise<Persona[] | RespuestaGrap>;
  getById(id_persona: string): Promise<Persona | RespuestaGrap>;
  getAliadosSede(id_usuario: string): Promise<Persona[] | RespuestaGrap>;
  getBenSedes(): Promise<Persona[] | RespuestaGrap>;
  getBeneficiarios(): Promise<Persona[] | RespuestaGrap>;
  createPersona(persona: Persona): Promise<Persona | RespuestaGrap>;
  updatePersona(
    id_persona: string,
    persona: Persona,
  ): Promise<Persona | RespuestaGrap>;
  deletePersona(id_persona: string): Promise<RespuestaGrap>;
}
