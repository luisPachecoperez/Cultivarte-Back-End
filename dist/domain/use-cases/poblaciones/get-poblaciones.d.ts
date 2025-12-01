import { Poblacion, RespuestaGrap, PoblacionRepository } from '../../';
export interface GetPoblacionesUseCase {
    execute(): Promise<Poblacion[] | RespuestaGrap>;
}
export declare class GetPoblacionesUseCaseImpl implements GetPoblacionesUseCase {
    private readonly poblacionRepository;
    constructor(poblacionRepository: PoblacionRepository);
    execute(): Promise<Poblacion[] | RespuestaGrap>;
}
