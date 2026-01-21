import { Persona, PersonaRepository, RespuestaGrap } from '../..';

export interface GetPersonasParamsUseCase {
  execute(
    id_sede: string,
    id_programa: string,
    id_grupo_interes: string,
    limit: number,
    offset: number,
  ): Promise<Persona[] | RespuestaGrap>;
}

export class GetPersonasParamsUseCaseImpl implements GetPersonasParamsUseCase {
  constructor(private readonly personasRepository: PersonaRepository) {}

  async execute(
    id_sede: string,
    id_programa: string,
    id_grupo_interes: string,
    limit: number,
    offset: number,
  ): Promise<Persona[] | RespuestaGrap> {
    return this.personasRepository.getPersonasParams(
      id_sede,
      id_programa,
      id_grupo_interes,
      limit,
      offset,
    );
  }
}
