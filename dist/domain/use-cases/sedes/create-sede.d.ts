import { Sede } from '../../entities/sede';
import { RespuestaGrap } from '../../entities/respuesta';
import { SedeRepository } from '../../repositories/sede-repository';
export interface CreateSedeUseCase {
    execute(sede: Sede): Promise<Sede | RespuestaGrap>;
}
export declare class CreateSedeUseCaseImpl implements CreateSedeUseCase {
    private readonly sedeRepository;
    constructor(sedeRepository: SedeRepository);
    execute(sede: Sede): Promise<Sede | RespuestaGrap>;
}
