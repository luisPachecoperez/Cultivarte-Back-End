import { PersonasSedesDataSource,
         PersonasSede,
         RespuestaGrap,PersonasSedesRepository } from "../../domain";


export class PersonasSedesRepositoryImpl implements PersonasSedesRepository {
    
    constructor(
        private personasSedesDataSource: PersonasSedesDataSource
    ) {}

    getAll(): Promise<PersonasSede[] | RespuestaGrap> {
        return this.personasSedesDataSource.getAll();
    }

    getById( id_sede: string ): Promise<PersonasSede | RespuestaGrap> {
        return this.personasSedesDataSource.getById( id_sede );
    }

    create( personaSede: PersonasSede ): Promise<RespuestaGrap> {
        return this.personasSedesDataSource.create( personaSede );
    }

    updateById( id_sede: string, personaSede: PersonasSede ): Promise<RespuestaGrap> {
        return this.personasSedesDataSource.updateById( id_sede, personaSede );
    }

    deleteById( id_sede: string ): Promise<RespuestaGrap> {
        return this.personasSedesDataSource.deleteById( id_sede );
    }
}