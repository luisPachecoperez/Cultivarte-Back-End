import { PersonasSede, RespuestaGrap, PersonasSedesRepository } from '../../';
export interface UpdatePersonaSedeUseCase {
    execute(id_personas_sede: string, personaSede: PersonasSede): Promise<RespuestaGrap>;
}
export declare class UpdatePersonaSedeUseCaseImpl implements UpdatePersonaSedeUseCase {
    private readonly personaSedeRepository;
    constructor(personaSedeRepository: PersonasSedesRepository);
    execute(id_personas_sede: string, personasSede: PersonasSede): Promise<RespuestaGrap>;
}
