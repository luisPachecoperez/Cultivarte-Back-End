import { PoblacionRepository, RespuestaGrap } from '../../';
export interface DeletePoblacionUseCase {
    execute(id_poblacion: string): Promise<RespuestaGrap>;
}
export declare class DeletePoblacionUseCaseImpl implements DeletePoblacionUseCase {
    private readonly poblacionRepository;
    constructor(poblacionRepository: PoblacionRepository);
    execute(id_poblacion: string): Promise<RespuestaGrap>;
}
