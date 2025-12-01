import { PersonaGrupoInteres, PersonasGruposInteresDataSource, RespuestaGrap } from '../../domain';
export declare class PersonasGrupoInteresDataSourceImpl implements PersonasGruposInteresDataSource {
    private readonly pool;
    create(personaGrupoInteres: PersonaGrupoInteres): Promise<RespuestaGrap>;
    updateById(id_persona_grupo_interes: string, personaGrupoInteres: PersonaGrupoInteres): Promise<RespuestaGrap>;
    deleteById(id_persona_grupo_interes: string): Promise<RespuestaGrap>;
    getAll(): Promise<PersonaGrupoInteres[] | RespuestaGrap>;
    getById(id_persona_grupo_interes: string): Promise<PersonaGrupoInteres | RespuestaGrap>;
}
