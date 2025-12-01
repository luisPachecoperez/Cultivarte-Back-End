import { Persona, PersonaRepository, RespuestaGrap } from '../../';
export interface GetPersonasUseCase {
    execute(limit: number, offset: number): Promise<Persona[] | RespuestaGrap>;
}
export declare class GetPersonasUseCaseImpl implements GetPersonasUseCase {
    private readonly personasRepository;
    constructor(personasRepository: PersonaRepository);
    execute(limit: number, offset: number): Promise<Persona[] | RespuestaGrap>;
}
