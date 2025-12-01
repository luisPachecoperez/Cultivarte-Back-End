import { ParametrosGenerales, ParametrosGeneralesRepository, RespuestaGrap } from '../../';
export interface UpdateParametroGeneralUseCase {
    execute(id_parametro_general: string, data: ParametrosGenerales): Promise<RespuestaGrap>;
}
export declare class UpdateParametroGeneralUseCaseImpl implements UpdateParametroGeneralUseCase {
    private readonly parametroGeneralRepository;
    constructor(parametroGeneralRepository: ParametrosGeneralesRepository);
    execute(id_parametro_general: string, data: ParametrosGenerales): Promise<RespuestaGrap>;
}
