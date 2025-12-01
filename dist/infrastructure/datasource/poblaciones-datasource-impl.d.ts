import { Poblacion, RespuestaGrap, PoblacionDataSource } from '../../domain';
export declare class PoblacionDataSourceImpl implements PoblacionDataSource {
    private readonly pool;
    getPoblaciones(): Promise<Poblacion[] | RespuestaGrap>;
    getPoblacionById(id_poblacion: string): Promise<Poblacion | RespuestaGrap>;
    createPoblacion(poblacion: Poblacion): Promise<RespuestaGrap>;
    updatePoblacionById(id_poblacion: string, poblacion: Poblacion): Promise<RespuestaGrap>;
    deletePoblacionById(id_poblacion: string): Promise<RespuestaGrap>;
}
