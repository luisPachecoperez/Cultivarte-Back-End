import { ParametriaEventos, ParametriaEventosRepository, ParametriaEventosDataSource } from '../../domain';
export declare class ParametriaEventosRepositoryImpl implements ParametriaEventosRepository {
    private readonly parametriaEventosDataSource;
    constructor(parametriaEventosDataSource: ParametriaEventosDataSource);
    getAll(): Promise<ParametriaEventos>;
}
