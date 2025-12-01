import { ParametrosGenerales, RespuestaGrap, ParametrosGeneralesDataSource } from '../../domain';
export declare class ParametrosGeneralesDataSourceImpl implements ParametrosGeneralesDataSource {
    private readonly pool;
    getAll(): Promise<ParametrosGenerales[] | RespuestaGrap>;
    getById(id_parametro_general: string): Promise<ParametrosGenerales | RespuestaGrap>;
    create(parametrosGenerales: ParametrosGenerales): Promise<RespuestaGrap>;
    updateById(id_parametro_general: string, parametrosGenerales: ParametrosGenerales): Promise<RespuestaGrap>;
    deleteById(id_parametro_general: string): Promise<RespuestaGrap>;
}
