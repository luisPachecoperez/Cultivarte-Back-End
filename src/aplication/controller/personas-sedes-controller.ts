import { GetPersonaSedeUseCase,
         GetPersonasSedesUseCase,
         CreatePersonaSedeUseCase,
         UpdatePersonaSedeUseCase,
         DeletePersonaSedeUseCase,
         PersonaSede,
         RespuestaGrap, 
         } from "../../domain";

export class PersonasSedesController {
    constructor(
        private getPersonaSedeUseCase: GetPersonaSedeUseCase,
        private getPersonasSedesUseCase: GetPersonasSedesUseCase,
        private createPersonaSedeUseCase: CreatePersonaSedeUseCase,
        private updatePersonaSedeUseCase: UpdatePersonaSedeUseCase,
        private deletePersonaSedeUseCase: DeletePersonaSedeUseCase
    ) {}
    
    async getAll(): Promise<PersonaSede[] | RespuestaGrap> {
        return this.getPersonasSedesUseCase.execute();
    }
    
    async getById( id_sede: string ): Promise<PersonaSede | RespuestaGrap> {
        return this.getPersonaSedeUseCase.execute( id_sede );
    }   
    
    async create( personaSede: PersonaSede ): Promise<PersonaSede | RespuestaGrap> {
        return this.createPersonaSedeUseCase.execute( personaSede );
    }
    
    async update( id_sede: string, personaSede: PersonaSede ): Promise<PersonaSede | RespuestaGrap> {
        return this.updatePersonaSedeUseCase.execute( id_sede, personaSede );
    }
    
    async delete( id_sede: string ): Promise<PersonaSede | RespuestaGrap> {
        return this.deletePersonaSedeUseCase.execute( id_sede );
    }
}