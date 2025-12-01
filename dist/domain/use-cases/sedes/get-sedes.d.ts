import { RespuestaGrap } from '../../entities/respuesta';
import { Sede } from '../../entities/sede';
import { SedeRepository } from '../../repositories/sede-repository';
export interface GetSedesUseCase {
    execute(): Promise<Sede[] | RespuestaGrap>;
}
export declare class GetSedesUseCaseImpl implements GetSedesUseCase {
    private readonly sedeRepository;
    constructor(sedeRepository: SedeRepository);
    execute(): Promise<Sede[] | RespuestaGrap>;
}
