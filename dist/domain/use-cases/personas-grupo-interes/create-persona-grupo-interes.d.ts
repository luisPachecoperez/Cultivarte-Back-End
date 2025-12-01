import { PersonaGrupoInteres, RespuestaGrap, PersonasGruposInteresRepository } from '../../';
export interface CreatePersonaGrupoInteresUseCase {
    execute(personaGrupoInteres: PersonaGrupoInteres): Promise<RespuestaGrap>;
}
export declare class CreatePersonaGrupoInteresUseCaseImpl implements CreatePersonaGrupoInteresUseCase {
    private readonly personasGruposInteresRepository;
    constructor(personasGruposInteresRepository: PersonasGruposInteresRepository);
    execute(personaGrupoInteres: PersonaGrupoInteres): Promise<RespuestaGrap>;
}
