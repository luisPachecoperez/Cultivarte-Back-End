import { PersonaPrograma, PersonasProgramaRepository, PersonasProgramaDataSource, RespuestaGrap } from '../../domain';
export declare class PersonasProgramaRepositoryImpl implements PersonasProgramaRepository {
    private readonly dataSource;
    constructor(dataSource: PersonasProgramaDataSource);
    getById(id_persona_programa: string): Promise<PersonaPrograma | RespuestaGrap>;
    getAll(): Promise<PersonaPrograma[] | RespuestaGrap>;
    create(personaPrograma: PersonaPrograma): Promise<RespuestaGrap>;
    updateById(id_persona_programa: string, personaPrograma: PersonaPrograma): Promise<RespuestaGrap>;
    deleteById(id_persona_programa: string): Promise<RespuestaGrap>;
}
