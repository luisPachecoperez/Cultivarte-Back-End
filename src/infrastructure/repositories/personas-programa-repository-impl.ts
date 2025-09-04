import { PersonaPrograma, PersonasProgramaRepository, PersonasProgramaDataSource, RespuestaGrap } from "../../domain";

export class PersonasProgramaRepositoryImpl implements PersonasProgramaRepository {
    constructor(
        private readonly dataSource: PersonasProgramaDataSource
    ) { }

    async getById( id_persona_programa: string ): Promise<PersonaPrograma | RespuestaGrap> {
        return this.dataSource.getById( id_persona_programa );
    }
    
    async getAll(): Promise<PersonaPrograma[] | RespuestaGrap> {
        return this.dataSource.getAll();
    }   
    async create( personaPrograma: PersonaPrograma ): Promise<RespuestaGrap> {
        return this.dataSource.create( personaPrograma );
    }
    
    async updateById( id_persona_programa: string, personaPrograma: PersonaPrograma ): Promise<RespuestaGrap> {
        return this.dataSource.updateById( id_persona_programa, personaPrograma );
    }
    
    async deleteById( id_persona_programa: string ): Promise<RespuestaGrap> {
        return this.dataSource.deleteById( id_persona_programa );
    }
    
  
}