import { PersonasSede, RespuestaGrap, PersonasSedesRepository } from '../../';
export interface GetPersonaSedeUseCase {
    execute(id_persona_sede: string): Promise<PersonasSede | RespuestaGrap>;
}
export declare class GetPersonaSedeUseCaseImpl implements GetPersonaSedeUseCase {
    private readonly personaSedeRepository;
    constructor(personaSedeRepository: PersonasSedesRepository);
    execute(id_persona_sede: string): Promise<PersonasSede | RespuestaGrap>;
}
