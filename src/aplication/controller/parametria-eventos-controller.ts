import { GetParametriaEventosUseCase } from '../../domain';

export class ParametriaEventosController {
  constructor(
    private readonly getParametriaEventosUseCase: GetParametriaEventosUseCase,
  ) {}

  async getAll(): Promise<any> {
    return this.getParametriaEventosUseCase.execute();
  }
}
