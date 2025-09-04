import { PersonaPrograma, RespuestaGrap, PersonasProgramaRepository } from "../../";

export interface GetPersonaProgramaUseCase {
    execute( id_persona_programa: string ): Promise< PersonaPrograma | RespuestaGrap>;
}

export class GetPersonaProgramaUseCaseImpl implements GetPersonaProgramaUseCase {
    constructor(
        private personasProgramaRepository: PersonasProgramaRepository
    ) {}

    execute( id_persona_programa: string ): Promise<PersonaPrograma | RespuestaGrap> {
        return this.personasProgramaRepository.getById( id_persona_programa );
    }
}