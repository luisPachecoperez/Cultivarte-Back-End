import { Poblacion, RespuestaGrap, PoblacionRepository } from "../../";

export interface GetPoblacionesUseCase {
  execute(): Promise<Poblacion[] | RespuestaGrap>;
}

export class GetPoblacionesUseCaseImpl implements GetPoblacionesUseCase {
  constructor(private readonly poblacionRepository: PoblacionRepository) {}

  async execute(): Promise<Poblacion[] | RespuestaGrap> {
    return this.poblacionRepository.getPoblaciones();
  }
}
