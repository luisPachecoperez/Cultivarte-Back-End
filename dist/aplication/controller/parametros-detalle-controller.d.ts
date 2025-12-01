import { ParametroDetalle, CreateParametroDetalleUseCase, DeleteParametroDetalleUseCase, GetParametroDetalleUseCase, GetParametrosDetalleUseCase, UpdateParametroDetalleUseCase, RespuestaGrap } from '../../domain';
export declare class ParametrosDetalleController {
    private readonly createParametroDetalleUseCase;
    private readonly getParametrosDetalleUseCase;
    private readonly getParametroDetalleUseCase;
    private readonly updateParametroDetalleUseCase;
    private readonly deleteParametroDetalleUseCase;
    constructor(createParametroDetalleUseCase: CreateParametroDetalleUseCase, getParametrosDetalleUseCase: GetParametrosDetalleUseCase, getParametroDetalleUseCase: GetParametroDetalleUseCase, updateParametroDetalleUseCase: UpdateParametroDetalleUseCase, deleteParametroDetalleUseCase: DeleteParametroDetalleUseCase);
    createParametroDetalle(parametroDetalle: ParametroDetalle): Promise<ParametroDetalle | RespuestaGrap>;
    getParametrosDetalle(): Promise<ParametroDetalle[] | RespuestaGrap>;
    getParametroDetalle(id_parametro_detalle: string): Promise<ParametroDetalle | RespuestaGrap>;
    updateParametroDetalle(id_parametro_detalle: string, parametroDetalle: ParametroDetalle): Promise<ParametroDetalle | RespuestaGrap>;
    deleteParametroDetalle(id_parametro_detalle: string): Promise<RespuestaGrap>;
}
