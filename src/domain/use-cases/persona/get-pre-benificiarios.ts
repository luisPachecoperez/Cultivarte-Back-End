import { PreBeneficiario } from '@/domain/entities/beneficiario';
import { PersonaRepository, RespuestaGrap } from '../..';

export interface GetPreBeneficiarioUseCase {
  execute(id_usuario: string): Promise<PreBeneficiario[] | RespuestaGrap>;
}

export class GetPreBeneficiariosUseCaseImpl
  implements GetPreBeneficiarioUseCase
{
  constructor(private readonly personasRepository: PersonaRepository) {}

  async execute(
    id_usuario: string,
  ): Promise<PreBeneficiario[] | RespuestaGrap> {
    return this.personasRepository.getPreBeneficiarios(id_usuario);
  }
}
