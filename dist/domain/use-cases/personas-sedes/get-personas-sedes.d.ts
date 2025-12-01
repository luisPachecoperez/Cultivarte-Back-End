import { PersonasSede, RespuestaGrap, PersonasSedesRepository } from '../../';
export interface GetPersonasSedesUseCase {
    execute(): Promise<PersonasSede[] | RespuestaGrap>;
}
export declare class GetPersonasSedesUseCaseImpl implements GetPersonasSedesUseCase {
    private readonly personaSedeRepository;
    constructor(personaSedeRepository: PersonasSedesRepository);
    execute(): Promise<PersonasSede[] | RespuestaGrap>;
}
