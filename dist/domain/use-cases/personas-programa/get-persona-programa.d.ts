import { PersonaPrograma, RespuestaGrap, PersonasProgramaRepository } from '../../';
export interface GetPersonaProgramaUseCase {
    execute(id_persona_programa: string): Promise<PersonaPrograma | RespuestaGrap>;
}
export declare class GetPersonaProgramaUseCaseImpl implements GetPersonaProgramaUseCase {
    private readonly personasProgramaRepository;
    constructor(personasProgramaRepository: PersonasProgramaRepository);
    execute(id_persona_programa: string): Promise<PersonaPrograma | RespuestaGrap>;
}
