import { PersonaRepository, RespuestaGrap } from '../../';
export interface DeletePersonaUseCase {
    execute(id_persona: string): Promise<RespuestaGrap>;
}
export declare class DeletePersonaUseCaseImpl implements DeletePersonaUseCase {
    private readonly personasRepository;
    constructor(personasRepository: PersonaRepository);
    execute(id_persona: string): Promise<RespuestaGrap>;
}
