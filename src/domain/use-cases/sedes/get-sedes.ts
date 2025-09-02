import { RespuestaGrap } from "../../entities/respuesta";
import { Sede } from "../../entities/sede";
import { SedeRepository } from "../../repositories/sede-repository";

export interface GetSedesUseCase {
    execute(): Promise<Sede[] | RespuestaGrap>;
}   

export class GetSedesUseCaseImpl implements GetSedesUseCase {
    
    constructor(
        private sedeRepository: SedeRepository
    ) {}

    execute(): Promise<Sede[] | RespuestaGrap> {
        return this.sedeRepository.getAll();
    }
}