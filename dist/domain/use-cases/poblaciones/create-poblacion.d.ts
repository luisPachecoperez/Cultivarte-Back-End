import { Poblacion, RespuestaGrap, PoblacionRepository } from '../../';
export interface CreatePoblacionUseCase {
    execute(poblacion: Poblacion): Promise<Poblacion | RespuestaGrap>;
}
export declare class CreatePoblacionUseCaseImpl implements CreatePoblacionUseCase {
    private readonly poblacionRepository;
    constructor(poblacionRepository: PoblacionRepository);
    execute(poblacion: Poblacion): Promise<Poblacion | RespuestaGrap>;
}
