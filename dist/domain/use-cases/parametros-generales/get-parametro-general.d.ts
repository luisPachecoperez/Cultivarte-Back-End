import { ParametrosGenerales, ParametrosGeneralesRepository, RespuestaGrap } from '../../';
export interface GetParametroGeneralUseCase {
    execute(id_parametro_general: string): Promise<ParametrosGenerales | RespuestaGrap>;
}
export declare class GetParametroGeneralUseCaseImpl implements GetParametroGeneralUseCase {
    private readonly parametroGeneralRepository;
    constructor(parametroGeneralRepository: ParametrosGeneralesRepository);
    execute(id_parametro_general: string): Promise<ParametrosGenerales | RespuestaGrap>;
}
