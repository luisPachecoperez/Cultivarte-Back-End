import { RespuestaGrap, PersonasGruposInteresRepository } from "../../";

export interface DeletePersonaGrupoInteresUseCase {
  execute(id_persona_grupo_interes: string): Promise<RespuestaGrap>;
}

export class DeletePersonaGrupoInteresUseCaseImpl
  implements DeletePersonaGrupoInteresUseCase
{
  constructor(
    private personasGruposInteresRepository: PersonasGruposInteresRepository,
  ) {}

  execute(id_persona_grupo_interes: string): Promise<RespuestaGrap> {
    return this.personasGruposInteresRepository.deleteById(
      id_persona_grupo_interes,
    );
  }
}
