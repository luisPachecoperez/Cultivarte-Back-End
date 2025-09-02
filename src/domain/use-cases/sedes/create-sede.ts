import { Sede } from "../../entities/sede";
import { RespuestaGrap } from "../../entities/respuesta";
import { SedeRepository } from "../../repositories/sede-repository";

export interface CreateSedeUseCase {
    execute( sede: Sede ): Promise<Sede | RespuestaGrap>;
}

export class CreateSedeUseCaseImpl implements CreateSedeUseCase {
    
    constructor(
        private sedeRepository: SedeRepository
    ) {}

    execute( sede: Sede ): Promise<Sede | RespuestaGrap> {
        return this.sedeRepository.create( sede );
    }
}