import { PoblacionRepository, PoblacionDataSource, Poblacion, RespuestaGrap } from '../../domain';
export declare class PoblacionRepositoryImpl implements PoblacionRepository {
    private readonly dataSource;
    constructor(dataSource: PoblacionDataSource);
    createPoblacion(poblacion: Poblacion): Promise<RespuestaGrap>;
    updatePoblacionById(id_poblacion: string, poblacion: Poblacion): Promise<RespuestaGrap>;
    deletePoblacionById(id_poblacion: string): Promise<RespuestaGrap>;
    getPoblaciones(): Promise<Poblacion[] | RespuestaGrap>;
    getPoblacionById(id_poblacion: string): Promise<Poblacion | RespuestaGrap>;
}
