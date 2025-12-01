import { RespuestaGrap, PersonasProgramaRepository } from '../../';
export interface DeletePersonaProgramaUseCase {
    execute(id_persona_programa: string): Promise<RespuestaGrap>;
}
export declare class DeletePersonaProgramaUseCaseImpl implements DeletePersonaProgramaUseCase {
    private readonly personasProgramaRepository;
    constructor(personasProgramaRepository: PersonasProgramaRepository);
    execute(id_persona_programa: string): Promise<RespuestaGrap>;
}
