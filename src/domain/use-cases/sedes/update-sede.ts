import { RespuestaGrap } from "../../entities/respuesta";
import { Sede } from "../../entities/sede";
import { SedeRepository } from "../../repositories/sede-repository";

export interface UpdateSedeUseCase {
    execute( id_sede: string, sede: Sede ): Promise<RespuestaGrap>;
}

export class UpdateSedeUseCaseImpl implements UpdateSedeUseCase {
    
    constructor(
        private sedeRepository: SedeRepository
    ) {}

    execute( id_sede: string, sede: Sede ): Promise<RespuestaGrap> {
        return this.sedeRepository.updateById( id_sede, sede );
    }
}