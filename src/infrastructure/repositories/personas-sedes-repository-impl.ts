import { PersonasSedesDataSource,
         PersonaSede,
         RespuestaGrap,PersonasSedesRepository } from "../../domain";


export class PersonasSedesRepositoryImpl implements PersonasSedesRepository {
    
    constructor(
        private personasSedesDataSource: PersonasSedesDataSource
    ) {}

    getAll(): Promise<PersonaSede[] | RespuestaGrap> {
        return this.personasSedesDataSource.getAll();
    }

    getById(id_sede: string): Promise<PersonaSede | RespuestaGrap> {
        return this.personasSedesDataSource.getById(id_sede);
    }

    create(personaSede: PersonaSede): Promise<RespuestaGrap> {
        return this.personasSedesDataSource.create(personaSede);
    }

    updateById(id_sede: string, personaSede: PersonaSede): Promise<RespuestaGrap> {
        return this.personasSedesDataSource.updateById(id_sede, personaSede);
    }

    deleteById(id_sede: string): Promise<RespuestaGrap> {
        return this.personasSedesDataSource.deleteById(id_sede);
    }
}