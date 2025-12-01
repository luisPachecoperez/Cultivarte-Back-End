import { RespuestaGrap } from '../../entities/respuesta';
import { SedeRepository } from '../../repositories/sede-repository';
import { Sede } from '../../entities/sede';
export interface GetSedeUseCase {
    execute(id_sede: string): Promise<Sede | RespuestaGrap>;
}
export declare class GetSedeUseCaseImpl implements GetSedeUseCase {
    private readonly sedeRepository;
    constructor(sedeRepository: SedeRepository);
    execute(id_sede: string): Promise<Sede | RespuestaGrap>;
}
