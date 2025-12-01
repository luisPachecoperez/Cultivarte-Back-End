import { ParametrosGeneralesRepository, RespuestaGrap } from '../../';
export interface DeleteParametroGeneralUseCase {
    execute(id_parametro_general: string): Promise<RespuestaGrap>;
}
export declare class DeleteParametroGeneralUseCaseImpl implements DeleteParametroGeneralUseCase {
    private readonly parametroGeneralRepository;
    constructor(parametroGeneralRepository: ParametrosGeneralesRepository);
    execute(id_parametro_general: string): Promise<RespuestaGrap>;
}
