import {
  PersonaPrograma,
  RespuestaGrap,
  PersonasProgramaRepository,
} from '../../';

export interface GetPersonasProgramaUseCase {
  execute(
    limit: number,
    offset: number,
  ): Promise<PersonaPrograma[] | RespuestaGrap>;
}

export class GetPersonasProgramaUseCaseImpl
  implements GetPersonasProgramaUseCase
{
  constructor(
    private readonly personasProgramaRepository: PersonasProgramaRepository,
  ) {}

  execute(
    limit: number,
    offset: number,
  ): Promise<PersonaPrograma[] | RespuestaGrap> {
    return this.personasProgramaRepository.getAll(limit, offset);
  }
}
