import { RespuestaGrap, PersonasProgramaRepository } from "../../";

export interface DeletePersonaProgramaUseCase {
  execute(id_persona_programa: string): Promise<RespuestaGrap>;
}

export class DeletePersonaProgramaUseCaseImpl
  implements DeletePersonaProgramaUseCase
{
  constructor(private personasProgramaRepository: PersonasProgramaRepository) {}

  execute(id_persona_programa: string): Promise<RespuestaGrap> {
    return this.personasProgramaRepository.deleteById(id_persona_programa);
  }
}
