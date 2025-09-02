import { PersonaSede,
         RespuestaGrap,
         PersonasSedesRepository } from "../../";

export interface CreatePersonaSedeUseCase {
    execute(personaSede: PersonaSede): Promise<RespuestaGrap>;
}   

export class CreatePersonaSedeUseCaseImpl implements CreatePersonaSedeUseCase {
    constructor(
        private personaSedeRepository: PersonasSedesRepository
    ) {}

    execute(personaSede: PersonaSede): Promise<RespuestaGrap> {
        return this.personaSedeRepository.create(personaSede);
    }
}
