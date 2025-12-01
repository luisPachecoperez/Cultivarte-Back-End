import { ParametroDetalleRepository, RespuestaGrap } from '../../';
export interface DeleteParametroDetalleUseCase {
    execute(id_parametro_detalle: string): Promise<RespuestaGrap>;
}
export declare class DeleteParametroDetalleUseCaseImpl implements DeleteParametroDetalleUseCase {
    private readonly parametroDetalleRepository;
    constructor(parametroDetalleRepository: ParametroDetalleRepository);
    execute(id_parametro_detalle: string): Promise<RespuestaGrap>;
}
