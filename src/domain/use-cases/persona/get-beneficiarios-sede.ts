import { PersonaRepository, PersonaSede, RespuestaGrap } from "../../";

export interface GetBeneficiariosSedeUseCase {
  execute(): Promise<PersonaSede[] | RespuestaGrap>;
}

export class GetBeneficiariosSedeUseCaseImpl
  implements GetBeneficiariosSedeUseCase
{
  constructor(private readonly personasRepository: PersonaRepository) {}

  async execute(): Promise<PersonaSede[] | RespuestaGrap> {
    return this.personasRepository.getBeneficiariosSede();
  }
}
