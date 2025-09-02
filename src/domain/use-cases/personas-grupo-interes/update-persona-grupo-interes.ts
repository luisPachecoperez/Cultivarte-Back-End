import { PersonaGrupoInteres, RespuestaGrap, PersonasGruposInteresRepository } from "../../";

export interface UpdatePersonaGrupoInteres {
    execute(id_persona_grupo_interes: string, personaGrupoInteres: PersonaGrupoInteres): Promise<RespuestaGrap>;
}

export class UpdatePersonaGrupoInteresImpl implements UpdatePersonaGrupoInteres {
    constructor(
        private personasGruposInteresRepository: PersonasGruposInteresRepository
    ) {}
    
    execute(id_persona_grupo_interes: string, personaGrupoInteres: PersonaGrupoInteres): Promise<RespuestaGrap> {
        return this.personasGruposInteresRepository.updateById(id_persona_grupo_interes, personaGrupoInteres);
    }
}