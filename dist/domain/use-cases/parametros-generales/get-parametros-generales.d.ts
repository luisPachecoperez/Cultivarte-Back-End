import { ParametrosGenerales, ParametrosGeneralesRepository, RespuestaGrap } from '../../';
export interface GetParametrosGeneralesUseCase {
    execute(): Promise<ParametrosGenerales[] | RespuestaGrap>;
}
export declare class GetParametrosGeneralesUseCaseImpl implements GetParametrosGeneralesUseCase {
    private readonly parametroGeneralRepository;
    constructor(parametroGeneralRepository: ParametrosGeneralesRepository);
    execute(): Promise<ParametrosGenerales[] | RespuestaGrap>;
}
