import { PersonaRepository, Persona, RespuestaGrap } from '../../';
export interface GetBeneficiariosSedeUseCase {
    execute(): Promise<Persona[] | RespuestaGrap>;
}
export declare class GetBeneficiariosSedeUseCaseImpl implements GetBeneficiariosSedeUseCase {
    private readonly personasRepository;
    constructor(personasRepository: PersonaRepository);
    execute(): Promise<Persona[] | RespuestaGrap>;
}
