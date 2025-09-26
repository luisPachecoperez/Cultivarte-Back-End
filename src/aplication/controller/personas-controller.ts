import { Persona,
         PersonaSede,
         CreatePersonaUseCase,
         UpdatePersonaUseCase,
         DeletePersonaUseCase,
         GetPersonaUseCase,
         GetPersonasUseCase,
         GetAliadosSedeUseCase,
         GetBeneficiariosSedeUseCase,
         RespuestaGrap } from "../../domain";

export class PersonasController {
    
    constructor( 
        private readonly getPersonaUseCase: GetPersonaUseCase,
        private readonly getPersonasUseCase: GetPersonasUseCase,
        private readonly getAliadosSedeUseCase: GetAliadosSedeUseCase,
        private readonly getBeneficiariosSedeUseCase: GetBeneficiariosSedeUseCase,
        private readonly createPersonaUseCase: CreatePersonaUseCase,
        private readonly updatePersonaUseCase: UpdatePersonaUseCase,
        private readonly deletePersonaUseCase: DeletePersonaUseCase    
    ) {}

    async createPersona( persona:Persona ): Promise<Persona | RespuestaGrap> {
        return this.createPersonaUseCase.execute( persona );
    }

    async updatePersona( id_persona:string, persona:Persona ): Promise<Persona | RespuestaGrap> {
        return this.updatePersonaUseCase.execute( id_persona, persona );
    }

    async deletePersona( id_persona:string ): Promise<RespuestaGrap> {
        return this.deletePersonaUseCase.execute( id_persona );
    }

    async getPersona( id_persona:string ): Promise<Persona | RespuestaGrap> {
        return this.getPersonaUseCase.execute( id_persona );
    }

    async getPersonas( limit:number, offset:number ): Promise<Persona[] | RespuestaGrap> {
        return this.getPersonasUseCase.execute(limit, offset);
    }

    async getAliadosSede( id_usuario:string ): Promise<Persona[] | RespuestaGrap> {
        return this.getAliadosSedeUseCase.execute( id_usuario );
    }

    async getBeneficiariosSede(): Promise<PersonaSede[] | RespuestaGrap> {
        return this.getBeneficiariosSedeUseCase.execute();
    }
}
