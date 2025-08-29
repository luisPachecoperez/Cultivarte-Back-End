import { ParametriaEventos, ParametriaEventosRepository } from "../../";


export interface GetParametriaEventosUseCase {
    execute(): Promise<ParametriaEventos | null>;
}

export class GetParametriaEventosUseCaseImpl implements GetParametriaEventosUseCase {

    constructor(
        private repository: ParametriaEventosRepository 
    ) {}

    async execute(): Promise<ParametriaEventos | null> {
       return this.repository.getAll();
    }
}
