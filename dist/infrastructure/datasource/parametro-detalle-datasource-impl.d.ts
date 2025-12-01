import { ParametroDetalle, ParametroDetalleDataSource, RespuestaGrap } from '../../domain';
export declare class ParametroDetalleDataSourceImpl implements ParametroDetalleDataSource {
    private readonly pool;
    getAll(): Promise<ParametroDetalle[]>;
    getById(id_parametro_detalle: string): Promise<ParametroDetalle | RespuestaGrap>;
    create(parametroDetalle: ParametroDetalle): Promise<ParametroDetalle | RespuestaGrap>;
    updateById(id_parametro_detalle: string, parametroDetalle: ParametroDetalle): Promise<ParametroDetalle | RespuestaGrap>;
    deleteById(id_parametro_detalle: string): Promise<RespuestaGrap>;
}
