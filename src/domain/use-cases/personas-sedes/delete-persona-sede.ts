import { PersonasSedesRepository, RespuestaGrap } from "../../";

export interface DeletePersonaSedeUseCase {
  execute(id_sede: string): Promise<RespuestaGrap>;
}

export class DeletePersonaSedeUseCaseImpl implements DeletePersonaSedeUseCase {
  constructor(private personaSedeRepository: PersonasSedesRepository) {}

  execute(id_sede: string): Promise<RespuestaGrap> {
    return this.personaSedeRepository.deleteById(id_sede);
  }
}
