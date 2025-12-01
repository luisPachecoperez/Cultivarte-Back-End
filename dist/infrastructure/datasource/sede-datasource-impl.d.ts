import { SedeDataSource } from '../../domain/datasources/sede-datasource';
import { Sede, RespuestaGrap } from '../../domain';
export declare class SedeDataSourceImpl implements SedeDataSource {
    private readonly pool;
    getAll(): Promise<Sede[] | RespuestaGrap>;
    getById(id_sede: string): Promise<Sede | RespuestaGrap>;
    create(sede: Sede): Promise<RespuestaGrap>;
    updateById(id_sede: string, sede: Sede): Promise<RespuestaGrap>;
    deleteById(id_sede: string): Promise<RespuestaGrap>;
}
