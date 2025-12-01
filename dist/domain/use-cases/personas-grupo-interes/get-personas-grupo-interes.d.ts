import { PersonaGrupoInteres, RespuestaGrap, PersonasGruposInteresRepository } from '../../';
export interface GetPersonasGrupoInteresUseCase {
    execute(): Promise<PersonaGrupoInteres[] | RespuestaGrap>;
}
export declare class GetPersonasGrupoInteresUseCaseImpl implements GetPersonasGrupoInteresUseCase {
    private readonly personasGruposInteresRepository;
    constructor(personasGruposInteresRepository: PersonasGruposInteresRepository);
    execute(): Promise<PersonaGrupoInteres[] | RespuestaGrap>;
}
