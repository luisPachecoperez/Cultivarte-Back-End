import { ParametroDetalle, ParametroDetalleRepository, RespuestaGrap } from '../../';
export interface GetParametroDetalleUseCase {
    execute(id_parametro_detalle: string): Promise<ParametroDetalle | RespuestaGrap>;
}
export declare class GetParametroDetalleUseCaseImpl implements GetParametroDetalleUseCase {
    private readonly parametroDetalleRepository;
    constructor(parametroDetalleRepository: ParametroDetalleRepository);
    execute(id_parametro_detalle: string): Promise<ParametroDetalle | RespuestaGrap>;
}
