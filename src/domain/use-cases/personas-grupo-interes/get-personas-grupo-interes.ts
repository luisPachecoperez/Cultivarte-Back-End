import {
  PersonaGrupoInteres,
  RespuestaGrap,
  PersonasGruposInteresRepository,
} from '../../';

export interface GetPersonasGrupoInteresUseCase {
  execute(): Promise<PersonaGrupoInteres[] | RespuestaGrap>;
}

export class GetPersonasGrupoInteresUseCaseImpl
  implements GetPersonasGrupoInteresUseCase
{
  constructor(
    private readonly personasGruposInteresRepository: PersonasGruposInteresRepository,
  ) {}

  execute(): Promise<PersonaGrupoInteres[] | RespuestaGrap> {
    return this.personasGruposInteresRepository.getAll();
  }
}
