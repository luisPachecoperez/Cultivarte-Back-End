import { PersonaGrupoInteres, RespuestaGrap, PersonasGruposInteresRepository } from "../../";

export interface DeletePersonaGrupoInteres {
    execute( id_persona_grupo_interes: string ): Promise<RespuestaGrap>;
}

export class DeletePersonaGrupoInteresImpl implements DeletePersonaGrupoInteres {
    constructor(
        private personasGruposInteresRepository: PersonasGruposInteresRepository
    ) {}
    
    execute( id_persona_grupo_interes: string ): Promise<RespuestaGrap> {
        return this.personasGruposInteresRepository.deleteById( id_persona_grupo_interes );
    }
}