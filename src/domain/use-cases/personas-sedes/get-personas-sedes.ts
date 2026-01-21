import { PersonasSede, RespuestaGrap, PersonasSedesRepository } from '../../';

export interface GetPersonasSedesUseCase {
  execute(
    limit: number,
    offset: number,
  ): Promise<PersonasSede[] | RespuestaGrap>;
}

export class GetPersonasSedesUseCaseImpl implements GetPersonasSedesUseCase {
  constructor(
    private readonly personaSedeRepository: PersonasSedesRepository,
  ) {}

  execute(
    limit: number,
    offset: number,
  ): Promise<PersonasSede[] | RespuestaGrap> {
    return this.personaSedeRepository.getAll(limit, offset);
  }
}
