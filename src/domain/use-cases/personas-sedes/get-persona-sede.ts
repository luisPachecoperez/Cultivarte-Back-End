import { PersonasSede, RespuestaGrap, PersonasSedesRepository } from '../../';

export interface GetPersonaSedeUseCase {
  execute(id_persona_sede: string): Promise<PersonasSede | RespuestaGrap>;
}

export class GetPersonaSedeUseCaseImpl implements GetPersonaSedeUseCase {
  constructor(
    private readonly personaSedeRepository: PersonasSedesRepository,
  ) {}

  execute(id_persona_sede: string): Promise<PersonasSede | RespuestaGrap> {
    return this.personaSedeRepository.getById(id_persona_sede);
  }
}
