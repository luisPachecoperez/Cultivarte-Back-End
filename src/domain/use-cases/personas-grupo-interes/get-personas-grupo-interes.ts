import {
  PersonaGrupoInteres,
  RespuestaGrap,
  PersonasGruposInteresRepository,
} from '../../';

export interface GetPersonasGrupoInteresUseCase {
  execute(
    limit: number,
    offset: number,
  ): Promise<PersonaGrupoInteres[] | RespuestaGrap>;
}

export class GetPersonasGrupoInteresUseCaseImpl
  implements GetPersonasGrupoInteresUseCase
{
  constructor(
    private readonly personasGruposInteresRepository: PersonasGruposInteresRepository,
  ) {}

  execute(
    limit: number,
    offset: number,
  ): Promise<PersonaGrupoInteres[] | RespuestaGrap> {
    return this.personasGruposInteresRepository.getAll(limit, offset);
  }
}
