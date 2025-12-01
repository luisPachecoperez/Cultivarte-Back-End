import { Poblacion, RespuestaGrap, PoblacionRepository } from '../../';
export interface UpdatePoblacionUseCase {
    execute(id_poblacion: string, poblacion: Poblacion): Promise<Poblacion | RespuestaGrap>;
}
export declare class UpdatePoblacionUseCaseImpl implements UpdatePoblacionUseCase {
    private readonly poblacionRepository;
    constructor(poblacionRepository: PoblacionRepository);
    execute(id_poblacion: string, poblacion: Poblacion): Promise<Poblacion | RespuestaGrap>;
}
