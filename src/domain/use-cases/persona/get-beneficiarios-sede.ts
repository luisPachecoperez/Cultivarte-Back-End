import { PersonaRepository, Persona, RespuestaGrap } from '../../';

export interface GetBeneficiariosSedeUseCase {
  execute(): Promise<Persona[] | RespuestaGrap>;
}

export class GetBeneficiariosSedeUseCaseImpl
  implements GetBeneficiariosSedeUseCase
{
  constructor(private readonly personasRepository: PersonaRepository) {}

  async execute(): Promise<Persona[] | RespuestaGrap> {
    return this.personasRepository.getBenSedes();
  }
}
