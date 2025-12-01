import { ParametriaEventos, ParametriaEventosDataSource } from '../../domain';
export declare class ParametriaEventosDataSourceImpl implements ParametriaEventosDataSource {
    private readonly pool;
    getAll(): Promise<Array<{
        grupo: keyof ParametriaEventos;
        id: string;
        nombre: string;
    }>>;
}
