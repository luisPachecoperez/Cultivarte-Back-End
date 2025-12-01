import { RespuestaGrap, PersonasSede } from '../';
export interface PersonasSedesDataSource {
    getAll(): Promise<PersonasSede[] | RespuestaGrap>;
    getById(id_sede: string): Promise<PersonasSede | RespuestaGrap>;
    create(personaSede: PersonasSede): Promise<RespuestaGrap>;
    updateById(id_sede: string, personaSede: PersonasSede): Promise<RespuestaGrap>;
    deleteById(id_sede: string): Promise<RespuestaGrap>;
}
