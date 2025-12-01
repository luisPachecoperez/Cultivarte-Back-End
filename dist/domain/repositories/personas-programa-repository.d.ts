import { PersonaPrograma, RespuestaGrap } from '..';
export interface PersonasProgramaRepository {
    getAll(): Promise<PersonaPrograma[] | RespuestaGrap>;
    getById(id_persona_programa: string): Promise<PersonaPrograma | RespuestaGrap>;
    create(personasPrograma: PersonaPrograma): Promise<RespuestaGrap>;
    updateById(id_persona_programa: string, personasPrograma: PersonaPrograma): Promise<RespuestaGrap>;
    deleteById(id_persona_programa: string): Promise<RespuestaGrap>;
}
