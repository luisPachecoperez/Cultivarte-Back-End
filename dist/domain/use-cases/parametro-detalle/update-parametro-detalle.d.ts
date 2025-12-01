import { ParametroDetalle, ParametroDetalleRepository, RespuestaGrap } from '../../';
export interface UpdateParametroDetalleUseCase {
    execute(id_parametro_detalle: string, parametroDetalle: ParametroDetalle): Promise<ParametroDetalle | RespuestaGrap>;
}
export declare class UpdateParametroDetalleUseCaseImpl implements UpdateParametroDetalleUseCase {
    private readonly parametroDetalleRepository;
    constructor(parametroDetalleRepository: ParametroDetalleRepository);
    execute(id_parametro_detalle: string, parametroDetalle: ParametroDetalle): Promise<ParametroDetalle | RespuestaGrap>;
}
