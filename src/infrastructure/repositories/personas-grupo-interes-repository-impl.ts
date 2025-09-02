import { PersonaGrupoInteres, 
         PersonasGruposInteresDataSource, 
         PersonasGruposInteresRepository, 
         RespuestaGrap } from "../../domain";

export class PersonasGrupoInteresRepositoryImpl implements PersonasGruposInteresRepository {
    
    constructor(
        private readonly personasGrupoInteresDataSource: PersonasGruposInteresDataSource
    ) {}

    async getAll(): Promise<PersonaGrupoInteres[] | RespuestaGrap> {
        return this.personasGrupoInteresDataSource.getAll();
    }

    async getById(id_persona_grupo_interes: string): Promise<PersonaGrupoInteres | RespuestaGrap> {
        return this.personasGrupoInteresDataSource.getById(id_persona_grupo_interes);
    }

    async create(personaGrupoInteres: PersonaGrupoInteres): Promise<RespuestaGrap> {
        return this.personasGrupoInteresDataSource.create(personaGrupoInteres);
    }

    async updateById(id_persona_grupo_interes: string, personaGrupoInteres: PersonaGrupoInteres): Promise<RespuestaGrap> {
        return this.personasGrupoInteresDataSource.updateById(id_persona_grupo_interes, personaGrupoInteres);
    }

    async deleteById(id_persona_grupo_interes: string): Promise<RespuestaGrap> {
        return this.personasGrupoInteresDataSource.deleteById(id_persona_grupo_interes);
    }
}