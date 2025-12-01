import { ParametriaEventos, ParametriaEventosRepository } from '../../';
export interface GetParametriaEventosUseCase {
    execute(): Promise<ParametriaEventos | null>;
}
export declare class GetParametriaEventosUseCaseImpl implements GetParametriaEventosUseCase {
    private readonly repository;
    constructor(repository: ParametriaEventosRepository);
    execute(): Promise<ParametriaEventos | null>;
}
