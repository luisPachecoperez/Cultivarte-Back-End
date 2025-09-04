import { PersonaPrograma,
         RespuestaGrap,
         PersonasProgramaRepository } from "../../";

export interface GetPersonasProgramaUseCase {
    execute(): Promise<PersonaPrograma[] | RespuestaGrap>;
}

export class GetPersonasProgramaUseCaseImpl implements GetPersonasProgramaUseCase {
    constructor(
        private personasProgramaRepository: PersonasProgramaRepository
    ) {}

    execute(): Promise<PersonaPrograma[] | RespuestaGrap> {
        return this.personasProgramaRepository.getAll();
    }
}
