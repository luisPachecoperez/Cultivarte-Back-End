import { PersonasSedesDataSource, PersonasSede, RespuestaGrap } from '../../domain';
export declare class PersonasSedesDataSourceImpl implements PersonasSedesDataSource {
    private readonly pool;
    getAll(): Promise<PersonasSede[] | RespuestaGrap>;
    getById(id_sede: string): Promise<PersonasSede | RespuestaGrap>;
    create(personaSede: PersonasSede): Promise<RespuestaGrap>;
    updateById(id_personas_sede: string, personaSede: PersonasSede): Promise<RespuestaGrap>;
    deleteById(id_personas_sede: string): Promise<RespuestaGrap>;
}
