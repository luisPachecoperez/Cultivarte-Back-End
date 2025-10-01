import {
  PersonaGrupoInteres,
  RespuestaGrap,
  PersonasGruposInteresRepository,
} from "../../";

export interface CreatePersonaGrupoInteresUseCase {
  execute(personaGrupoInteres: PersonaGrupoInteres): Promise<RespuestaGrap>;
}

export class CreatePersonaGrupoInteresUseCaseImpl
  implements CreatePersonaGrupoInteresUseCase
{
  constructor(
    private personasGruposInteresRepository: PersonasGruposInteresRepository,
  ) {}

  execute(personaGrupoInteres: PersonaGrupoInteres): Promise<RespuestaGrap> {
    return this.personasGruposInteresRepository.create(personaGrupoInteres);
  }
}
