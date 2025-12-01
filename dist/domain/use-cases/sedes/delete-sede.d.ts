import { RespuestaGrap } from '../../entities/respuesta';
import { SedeRepository } from '../../';
export interface DeleteSedeUseCase {
    execute(id_sede: string): Promise<RespuestaGrap>;
}
export declare class DeleteSedeUseCaseImpl implements DeleteSedeUseCase {
    private readonly sedeRepository;
    constructor(sedeRepository: SedeRepository);
    execute(id_sede: string): Promise<RespuestaGrap>;
}
