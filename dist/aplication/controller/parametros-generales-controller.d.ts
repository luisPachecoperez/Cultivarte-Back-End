import { ParametrosGenerales, CreateParametroGeneralUseCase, DeleteParametroGeneralUseCase, GetParametroGeneralUseCase, GetParametrosGeneralesUseCase, UpdateParametroGeneralUseCase, RespuestaGrap } from '../../domain';
export declare class ParametrosGeneralesController {
    private readonly createParametroGeneralUseCase;
    private readonly getParametrosGeneralesUseCase;
    private readonly getParametroGeneralUseCase;
    private readonly updateParametroGeneralUseCase;
    private readonly deleteParametroGeneralUseCase;
    constructor(createParametroGeneralUseCase: CreateParametroGeneralUseCase, getParametrosGeneralesUseCase: GetParametrosGeneralesUseCase, getParametroGeneralUseCase: GetParametroGeneralUseCase, updateParametroGeneralUseCase: UpdateParametroGeneralUseCase, deleteParametroGeneralUseCase: DeleteParametroGeneralUseCase);
    createParametroGeneral(parametroGeneral: ParametrosGenerales): Promise<ParametrosGenerales | RespuestaGrap>;
    getParametrosGenerales(): Promise<ParametrosGenerales[] | RespuestaGrap>;
    getParametroGeneral(id_parametro_general: string): Promise<ParametrosGenerales | RespuestaGrap>;
    updateParametroGeneral(id_parametro_general: string, parametroGeneral: ParametrosGenerales): Promise<RespuestaGrap>;
    deleteParametroGeneral(id_parametro_general: string): Promise<RespuestaGrap>;
}
