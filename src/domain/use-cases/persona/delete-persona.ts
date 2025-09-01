import { PersonaRepository, RespuestaGrap } from "../../";

export interface DeletePersonaUseCase {
    execute( id_persona: string ): Promise<RespuestaGrap>;
}

export class DeletePersonaUseCaseImpl implements DeletePersonaUseCase {
    
    constructor( private readonly personasRepository: PersonaRepository ) {}

    async execute( id_persona: string ): Promise<RespuestaGrap> {
        return this.personasRepository.deletePersona( id_persona );
    }
}
