import { GetParametriaEventosUseCase } from "../../domain";

export class ParametriaEventosController {

    constructor(
        private getParametriaEventosUseCase: GetParametriaEventosUseCase
    ) {}

    async getAll(): Promise<any> {
        return this.getParametriaEventosUseCase.execute();
    }

}