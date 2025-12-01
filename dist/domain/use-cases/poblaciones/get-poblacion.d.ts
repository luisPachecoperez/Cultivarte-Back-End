import { Poblacion, RespuestaGrap, PoblacionRepository } from '../../';
export interface GetPoblacionUseCase {
    execute(id_poblacion: string): Promise<Poblacion | RespuestaGrap>;
}
export declare class GetPoblacionUseCaseImpl implements GetPoblacionUseCase {
    private readonly poblacionRepository;
    constructor(poblacionRepository: PoblacionRepository);
    execute(id_poblacion: string): Promise<Poblacion | RespuestaGrap>;
}
