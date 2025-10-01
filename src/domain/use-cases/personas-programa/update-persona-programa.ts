import {
  PersonaPrograma,
  RespuestaGrap,
  PersonasProgramaRepository,
} from "../../";

export interface UpdatePersonaProgramaUseCase {
  execute(
    id_persona: string,
    personaPrograma: PersonaPrograma,
  ): Promise<RespuestaGrap>;
}

export class UpdatePersonaProgramaUseCaseImpl
  implements UpdatePersonaProgramaUseCase
{
  constructor(private personasProgramaRepository: PersonasProgramaRepository) {}

  execute(
    id_persona: string,
    personaPrograma: PersonaPrograma,
  ): Promise<RespuestaGrap> {
    return this.personasProgramaRepository.updateById(
      id_persona,
      personaPrograma,
    );
  }
}
