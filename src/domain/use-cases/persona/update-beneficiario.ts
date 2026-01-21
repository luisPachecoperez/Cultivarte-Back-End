import { EditarBeneficiarios } from '@/domain/entities/Editar-beneficiarios';
import { PersonaRepository, RespuestaGrap } from '../..';

export interface UpdateBeneficiariosUseCase {
  execute(editarBeneficiarios: EditarBeneficiarios): Promise<RespuestaGrap>;
}

export class UpdateBeneficiariosUseCaseImpl
  implements UpdateBeneficiariosUseCase
{
  constructor(private readonly personasRepository: PersonaRepository) {}

  async execute(
    editarBeneficiarios: EditarBeneficiarios,
  ): Promise<RespuestaGrap> {
    return this.personasRepository.updateBeneficiarios(editarBeneficiarios);
  }
}
