import { Persona, PersonaRepository, RespuestaGrap } from '../../';
export interface GetPersonaUseCase {
    execute(id_persona: string): Promise<Persona | RespuestaGrap>;
}
export declare class GetPersonaUseCaseImpl implements GetPersonaUseCase {
    private readonly personasRepository;
    constructor(personasRepository: PersonaRepository);
    execute(id_persona: string): Promise<Persona | RespuestaGrap>;
}
