import { PersonasSedesDataSource, PersonasSede, RespuestaGrap, PersonasSedesRepository } from '../../domain';
export declare class PersonasSedesRepositoryImpl implements PersonasSedesRepository {
    private readonly personasSedesDataSource;
    constructor(personasSedesDataSource: PersonasSedesDataSource);
    getAll(): Promise<PersonasSede[] | RespuestaGrap>;
    getById(id_sede: string): Promise<PersonasSede | RespuestaGrap>;
    create(personaSede: PersonasSede): Promise<RespuestaGrap>;
    updateById(id_sede: string, personaSede: PersonasSede): Promise<RespuestaGrap>;
    deleteById(id_sede: string): Promise<RespuestaGrap>;
}
