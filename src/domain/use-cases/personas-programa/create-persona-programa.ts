import {
  PersonaPrograma,
  RespuestaGrap,
  PersonasProgramaRepository,
} from "../../";

export interface CreatePersonaProgramaUseCase {
  execute(personaPrograma: PersonaPrograma): Promise<RespuestaGrap>;
}

export class CreatePersonaProgramaUseCaseImpl
  implements CreatePersonaProgramaUseCase
{
  constructor(private personasProgramaRepository: PersonasProgramaRepository) {}

  execute(personaPrograma: PersonaPrograma): Promise<RespuestaGrap> {
    return this.personasProgramaRepository.create(personaPrograma);
  }
}
