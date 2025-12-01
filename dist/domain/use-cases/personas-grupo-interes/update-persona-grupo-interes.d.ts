import { PersonaGrupoInteres, RespuestaGrap, PersonasGruposInteresRepository } from '../../';
export interface UpdatePersonaGrupoInteresUseCase {
    execute(id_persona_grupo_interes: string, personaGrupoInteres: PersonaGrupoInteres): Promise<RespuestaGrap>;
}
export declare class UpdatePersonaGrupoInteresUseCaseImpl implements UpdatePersonaGrupoInteresUseCase {
    private readonly personasGruposInteresRepository;
    constructor(personasGruposInteresRepository: PersonasGruposInteresRepository);
    execute(id_persona_grupo_interes: string, personaGrupoInteres: PersonaGrupoInteres): Promise<RespuestaGrap>;
}
