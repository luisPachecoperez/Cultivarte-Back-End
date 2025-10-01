import { Persona, PersonaRepository, RespuestaGrap } from "../../";

export interface GetPersonasUseCase {
  execute(limit: number, offset: number): Promise<Persona[] | RespuestaGrap>;
}

export class GetPersonasUseCaseImpl implements GetPersonasUseCase {
  constructor(private readonly personasRepository: PersonaRepository) {}

  async execute(
    limit: number,
    offset: number,
  ): Promise<Persona[] | RespuestaGrap> {
    return this.personasRepository.getAll(limit, offset);
  }
}
