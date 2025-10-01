import {
  PersonaGrupoInteres,
  RespuestaGrap,
  PersonasGruposInteresRepository,
} from "../../";

export interface GetPersonaGrupoInteresUseCase {
  execute(
    id_persona_grupo_interes: string,
  ): Promise<PersonaGrupoInteres | RespuestaGrap>;
}

export class GetPersonaGrupoInteresUseCaseImpl
  implements GetPersonaGrupoInteresUseCase
{
  constructor(
    private personasGruposInteresRepository: PersonasGruposInteresRepository,
  ) {}

  execute(
    id_persona_grupo_interes: string,
  ): Promise<PersonaGrupoInteres | RespuestaGrap> {
    return this.personasGruposInteresRepository.getById(
      id_persona_grupo_interes,
    );
  }
}
