import { ParametroDetalle, ParametroDetalleRepository, RespuestaGrap } from '../../';
export interface CreateParametroDetalleUseCase {
    execute(parametroDetalle: ParametroDetalle): Promise<ParametroDetalle | RespuestaGrap>;
}
export declare class CreateParametroDetalleUseCaseImpl implements CreateParametroDetalleUseCase {
    private readonly parametroDetalleRepository;
    constructor(parametroDetalleRepository: ParametroDetalleRepository);
    execute(parametroDetalle: ParametroDetalle): Promise<ParametroDetalle | RespuestaGrap>;
}
