import {
  PersonaGrupoInteres,
  RespuestaGrap,
  PersonasGruposInteresRepository,
} from "../../";

export interface UpdatePersonaGrupoInteresUseCase {
  execute(
    id_persona_grupo_interes: string,
    personaGrupoInteres: PersonaGrupoInteres,
  ): Promise<RespuestaGrap>;
}

export class UpdatePersonaGrupoInteresUseCaseImpl
  implements UpdatePersonaGrupoInteresUseCase
{
  constructor(
    private personasGruposInteresRepository: PersonasGruposInteresRepository,
  ) {}

  execute(
    id_persona_grupo_interes: string,
    personaGrupoInteres: PersonaGrupoInteres,
  ): Promise<RespuestaGrap> {
    return this.personasGruposInteresRepository.updateById(
      id_persona_grupo_interes,
      personaGrupoInteres,
    );
  }
}
