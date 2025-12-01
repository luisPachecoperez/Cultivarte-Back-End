import { PersonaPrograma, RespuestaGrap, PersonasProgramaRepository } from '../../';
export interface UpdatePersonaProgramaUseCase {
    execute(id_persona: string, personaPrograma: PersonaPrograma): Promise<RespuestaGrap>;
}
export declare class UpdatePersonaProgramaUseCaseImpl implements UpdatePersonaProgramaUseCase {
    private readonly personasProgramaRepository;
    constructor(personasProgramaRepository: PersonasProgramaRepository);
    execute(id_persona: string, personaPrograma: PersonaPrograma): Promise<RespuestaGrap>;
}
