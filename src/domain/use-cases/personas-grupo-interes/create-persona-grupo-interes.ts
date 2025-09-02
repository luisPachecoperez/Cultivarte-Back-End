import { PersonaGrupoInteres, RespuestaGrap, PersonasGruposInteresRepository } from "../../";

export interface CreatePersonaGrupoInteres {
    execute( personaGrupoInteres: PersonaGrupoInteres ): Promise<RespuestaGrap>;
}

export class CreatePersonaGrupoInteresImpl implements CreatePersonaGrupoInteres {
    constructor(
        private personasGruposInteresRepository: PersonasGruposInteresRepository
    ) {}
    
    execute( personaGrupoInteres: PersonaGrupoInteres ): Promise<RespuestaGrap> {
        return this.personasGruposInteresRepository.create( personaGrupoInteres );
    }
}
