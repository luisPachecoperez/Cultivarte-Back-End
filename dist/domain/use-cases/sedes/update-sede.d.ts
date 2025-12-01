import { RespuestaGrap } from '../../entities/respuesta';
import { Sede } from '../../entities/sede';
import { SedeRepository } from '../../repositories/sede-repository';
export interface UpdateSedeUseCase {
    execute(id_sede: string, sede: Sede): Promise<RespuestaGrap>;
}
export declare class UpdateSedeUseCaseImpl implements UpdateSedeUseCase {
    private readonly sedeRepository;
    constructor(sedeRepository: SedeRepository);
    execute(id_sede: string, sede: Sede): Promise<RespuestaGrap>;
}
