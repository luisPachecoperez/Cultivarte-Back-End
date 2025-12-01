import { PersonaPrograma, PersonasProgramaDataSource, RespuestaGrap } from '../../domain';
export declare class PersonasProgramaDataSourceImpl implements PersonasProgramaDataSource {
    private readonly pool;
    getAll(): Promise<PersonaPrograma[] | RespuestaGrap>;
    getById(id_persona_programa: string): Promise<PersonaPrograma | RespuestaGrap>;
    create(personaPrograma: PersonaPrograma): Promise<RespuestaGrap>;
    updateById(id_persona_programa: string, personaPrograma: PersonaPrograma): Promise<RespuestaGrap>;
    deleteById(id_persona_programa: string): Promise<RespuestaGrap>;
}
