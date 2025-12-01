import { GetParametriaEventosUseCase } from '../../domain';
export declare class ParametriaEventosController {
    private readonly getParametriaEventosUseCase;
    constructor(getParametriaEventosUseCase: GetParametriaEventosUseCase);
    getAll(): Promise<any>;
}
