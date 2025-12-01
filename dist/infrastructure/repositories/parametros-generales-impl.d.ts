import { ParametrosGenerales, ParametrosGeneralesRepository, ParametrosGeneralesDataSource, RespuestaGrap } from '../../domain';
export declare class ParametrosGeneralesRepositoryImpl implements ParametrosGeneralesRepository {
    private readonly parametrosGeneralesDataSource;
    constructor(parametrosGeneralesDataSource: ParametrosGeneralesDataSource);
    getAll(): Promise<ParametrosGenerales[] | RespuestaGrap>;
    getById(id_parametro_general: string): Promise<ParametrosGenerales | RespuestaGrap>;
    create(data: ParametrosGenerales): Promise<RespuestaGrap>;
    updateById(id_parametro_general: string, data: ParametrosGenerales): Promise<RespuestaGrap>;
    deleteById(id_parametro_general: string): Promise<RespuestaGrap>;
}
