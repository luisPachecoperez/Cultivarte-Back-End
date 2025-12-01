import { PersonaGrupoInteres, RespuestaGrap, PersonasGruposInteresRepository } from '../../';
export interface GetPersonaGrupoInteresUseCase {
    execute(id_persona_grupo_interes: string): Promise<PersonaGrupoInteres | RespuestaGrap>;
}
export declare class GetPersonaGrupoInteresUseCaseImpl implements GetPersonaGrupoInteresUseCase {
    private readonly personasGruposInteresRepository;
    constructor(personasGruposInteresRepository: PersonasGruposInteresRepository);
    execute(id_persona_grupo_interes: string): Promise<PersonaGrupoInteres | RespuestaGrap>;
}
