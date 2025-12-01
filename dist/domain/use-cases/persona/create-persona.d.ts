import { Persona, PersonaRepository, RespuestaGrap } from '../../';
export interface CreatePersonaUseCase {
    execute(persona: Persona): Promise<Persona | RespuestaGrap>;
}
export declare class CreatePersonaUseCaseImpl implements CreatePersonaUseCase {
    private readonly personasRepository;
    constructor(personasRepository: PersonaRepository);
    execute(persona: Persona): Promise<Persona | RespuestaGrap>;
}
