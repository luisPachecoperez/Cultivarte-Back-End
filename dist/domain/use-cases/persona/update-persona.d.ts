import { Persona, PersonaRepository, RespuestaGrap } from '../../';
export interface UpdatePersonaUseCase {
    execute(id_persona: string, persona: Persona): Promise<Persona | RespuestaGrap>;
}
export declare class UpdatePersonaUseCaseImpl implements UpdatePersonaUseCase {
    private readonly personasRepository;
    constructor(personasRepository: PersonaRepository);
    execute(id_persona: string, persona: Persona): Promise<Persona | RespuestaGrap>;
}
