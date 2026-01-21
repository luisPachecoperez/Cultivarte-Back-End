import { Persona, PersonaRepository, RespuestaGrap } from '../..';

export interface GetPersonaByTipoIdenficacionNumeroIdentificacionUseCase {
  execute(
    id_tipo_identificacion: string,
    identificacion: string,
  ): Promise<Persona | RespuestaGrap>;
}

export class GetPersonaByTipoIdenficacionNumeroIdentificacionUseCaseImpl
  implements GetPersonaByTipoIdenficacionNumeroIdentificacionUseCase
{
  constructor(private readonly personasRepository: PersonaRepository) {}

  async execute(
    id_tipo_identificacion: string,
    identificacion: string,
  ): Promise<Persona | RespuestaGrap> {
    return this.personasRepository.getPersonaByTipoIdenficacionNumeroIdentificacion(
      id_tipo_identificacion,
      identificacion,
    );
  }
}
