import { PersonaSede,
         RespuestaGrap,
         PersonasSedesRepository } from "../../";

export interface GetPersonaSedeUseCase {
    execute(id_sede: string): Promise<PersonaSede | RespuestaGrap>;
}
    
export class GetPersonaSedeUseCaseImpl implements GetPersonaSedeUseCase {
    constructor(
        private personaSedeRepository: PersonasSedesRepository
    ) {}

    execute(id_sede: string): Promise<PersonaSede | RespuestaGrap> {
        return this.personaSedeRepository.getById(id_sede);
    }
}
