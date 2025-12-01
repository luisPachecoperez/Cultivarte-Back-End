import { PersonasSede, RespuestaGrap, PersonasSedesRepository } from '../../';

export interface GetPersonasSedesUseCase {
  execute(): Promise<PersonasSede[] | RespuestaGrap>;
}

export class GetPersonasSedesUseCaseImpl implements GetPersonasSedesUseCase {
  constructor(
    private readonly personaSedeRepository: PersonasSedesRepository,
  ) {}

  execute(): Promise<PersonasSede[] | RespuestaGrap> {
    return this.personaSedeRepository.getAll();
  }
}
