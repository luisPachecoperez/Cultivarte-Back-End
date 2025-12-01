import { PersonaPrograma, RespuestaGrap, PersonasProgramaRepository } from '../../';
export interface GetPersonasProgramaUseCase {
    execute(): Promise<PersonaPrograma[] | RespuestaGrap>;
}
export declare class GetPersonasProgramaUseCaseImpl implements GetPersonasProgramaUseCase {
    private readonly personasProgramaRepository;
    constructor(personasProgramaRepository: PersonasProgramaRepository);
    execute(): Promise<PersonaPrograma[] | RespuestaGrap>;
}
