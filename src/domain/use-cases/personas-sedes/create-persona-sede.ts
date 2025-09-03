import { PersonasSede,
         RespuestaGrap,
         PersonasSedesRepository } from "../../";

export interface CreatePersonaSedeUseCase {
    execute(personaSede: PersonasSede): Promise<RespuestaGrap>;
}   

export class CreatePersonaSedeUseCaseImpl implements CreatePersonaSedeUseCase {
    constructor(
        private personaSedeRepository: PersonasSedesRepository
    ) {}

    execute(personaSede: PersonasSede): Promise<RespuestaGrap> {
        return this.personaSedeRepository.create(personaSede);
    }
}
