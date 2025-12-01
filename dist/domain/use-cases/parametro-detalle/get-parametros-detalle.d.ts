import { ParametroDetalle, ParametroDetalleRepository, RespuestaGrap } from '../../';
export interface GetParametrosDetalleUseCase {
    execute(): Promise<ParametroDetalle[] | RespuestaGrap>;
}
export declare class GetParametrosDetalleUseCaseImpl implements GetParametrosDetalleUseCase {
    private readonly parametroDetalleRepository;
    constructor(parametroDetalleRepository: ParametroDetalleRepository);
    execute(): Promise<ParametroDetalle[] | RespuestaGrap>;
}
