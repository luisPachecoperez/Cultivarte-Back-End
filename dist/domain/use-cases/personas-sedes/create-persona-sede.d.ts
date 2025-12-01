import { PersonasSede, RespuestaGrap, PersonasSedesRepository } from '../../';
export interface CreatePersonaSedeUseCase {
    execute(personaSede: PersonasSede): Promise<RespuestaGrap>;
}
export declare class CreatePersonaSedeUseCaseImpl implements CreatePersonaSedeUseCase {
    private readonly personaSedeRepository;
    constructor(personaSedeRepository: PersonasSedesRepository);
    execute(personaSede: PersonasSede): Promise<RespuestaGrap>;
}
