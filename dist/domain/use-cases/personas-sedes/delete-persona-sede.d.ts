import { PersonasSedesRepository, RespuestaGrap } from '../../';
export interface DeletePersonaSedeUseCase {
    execute(id_sede: string): Promise<RespuestaGrap>;
}
export declare class DeletePersonaSedeUseCaseImpl implements DeletePersonaSedeUseCase {
    private readonly personaSedeRepository;
    constructor(personaSedeRepository: PersonasSedesRepository);
    execute(id_sede: string): Promise<RespuestaGrap>;
}
