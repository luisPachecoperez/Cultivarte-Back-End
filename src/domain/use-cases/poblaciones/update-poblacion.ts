import { Poblacion, RespuestaGrap, PoblacionRepository } from "../../";

export interface UpdatePoblacionUseCase {
  execute(
    id_poblacion: string,
    poblacion: Poblacion,
  ): Promise<Poblacion | RespuestaGrap>;
}

export class UpdatePoblacionUseCaseImpl implements UpdatePoblacionUseCase {
  constructor(private readonly poblacionRepository: PoblacionRepository) {}

  async execute(
    id_poblacion: string,
    poblacion: Poblacion,
  ): Promise<Poblacion | RespuestaGrap> {
    return this.poblacionRepository.updatePoblacionById(
      id_poblacion,
      poblacion,
    );
  }
}
