import { RespuestaGrap, PersonasGruposInteresRepository } from '../../';
export interface DeletePersonaGrupoInteresUseCase {
    execute(id_persona_grupo_interes: string): Promise<RespuestaGrap>;
}
export declare class DeletePersonaGrupoInteresUseCaseImpl implements DeletePersonaGrupoInteresUseCase {
    private readonly personasGruposInteresRepository;
    constructor(personasGruposInteresRepository: PersonasGruposInteresRepository);
    execute(id_persona_grupo_interes: string): Promise<RespuestaGrap>;
}
