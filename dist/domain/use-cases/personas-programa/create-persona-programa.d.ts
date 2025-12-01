import { PersonaPrograma, RespuestaGrap, PersonasProgramaRepository } from '../../';
export interface CreatePersonaProgramaUseCase {
    execute(personaPrograma: PersonaPrograma): Promise<RespuestaGrap>;
}
export declare class CreatePersonaProgramaUseCaseImpl implements CreatePersonaProgramaUseCase {
    private readonly personasProgramaRepository;
    constructor(personasProgramaRepository: PersonasProgramaRepository);
    execute(personaPrograma: PersonaPrograma): Promise<RespuestaGrap>;
}
