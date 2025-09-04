import { CreatePersonaProgramaUseCase,
         DeletePersonaProgramaUseCase,
         GetPersonaProgramaUseCase,
         GetPersonasProgramaUseCase,
         UpdatePersonaProgramaUseCase,
         PersonaPrograma,
         RespuestaGrap } from "../../domain"

export class PersonasProgramaController {
    constructor(     
        private readonly createPersonaProgramaUseCase: CreatePersonaProgramaUseCase,
        private readonly updatePersonaProgramaUseCase: UpdatePersonaProgramaUseCase,
        private readonly deletePersonaProgramaUseCase: DeletePersonaProgramaUseCase,
        private readonly getPersonaProgramaUseCase: GetPersonaProgramaUseCase,
        private readonly getPersonasProgramaUseCase: GetPersonasProgramaUseCase 
    ){}
   
    async createPersonaPrograma( personaPrograma: PersonaPrograma ): Promise<RespuestaGrap> {
        return this.createPersonaProgramaUseCase.execute( personaPrograma );
    }

    async updatePersonaPrograma( id_persona_programa: string, personaPrograma: PersonaPrograma ): Promise<RespuestaGrap> {
        return this.updatePersonaProgramaUseCase.execute( id_persona_programa, personaPrograma );
    }

    async deletePersonaPrograma( id_persona_programa: string ): Promise<RespuestaGrap> {
        return this.deletePersonaProgramaUseCase.execute( id_persona_programa );
    }

    async getPersonaPrograma( id_persona_programa: string ): Promise<PersonaPrograma | RespuestaGrap> {
        return this.getPersonaProgramaUseCase.execute( id_persona_programa );
    }

    async getPersonasPrograma(): Promise<PersonaPrograma[] | RespuestaGrap> {
        return this.getPersonasProgramaUseCase.execute();
    }
}