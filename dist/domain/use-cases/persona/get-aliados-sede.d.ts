import { PersonaRepository, Persona, RespuestaGrap } from '../../';
export interface GetAliadosSedeUseCase {
    execute(id_usuario: string): Promise<Persona[] | RespuestaGrap>;
}
export declare class GetAliadosSedeUseCaseImpl implements GetAliadosSedeUseCase {
    private readonly personasRepository;
    constructor(personasRepository: PersonaRepository);
    execute(id_usuario: string): Promise<Persona[]>;
}
