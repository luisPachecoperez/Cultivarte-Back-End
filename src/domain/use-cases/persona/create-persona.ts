import { Persona, PersonaRepository, RespuestaGrap } from '../../';

export interface CreatePersonaUseCase {
  execute(persona: Persona): Promise<Persona | RespuestaGrap>;
}

export class CreatePersonaUseCaseImpl implements CreatePersonaUseCase {
  constructor(private readonly personasRepository: PersonaRepository) {}

  async execute(persona: Persona): Promise<Persona | RespuestaGrap> {
    return this.personasRepository.createPersona(persona);
  }
}
