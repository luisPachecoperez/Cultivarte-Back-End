import { Persona, PersonaRepository, RespuestaGrap } from '../../';

export interface UpdatePersonaUseCase {
  execute(
    id_persona: string,
    persona: Persona,
  ): Promise<Persona | RespuestaGrap>;
}

export class UpdatePersonaUseCaseImpl implements UpdatePersonaUseCase {
  constructor(private readonly personasRepository: PersonaRepository) {}

  async execute(
    id_persona: string,
    persona: Persona,
  ): Promise<Persona | RespuestaGrap> {
    return this.personasRepository.updatePersona(id_persona, persona);
  }
}
