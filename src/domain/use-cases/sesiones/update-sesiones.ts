import { SesionRepository, EditarSesiones, RespuestaGrap } from '../../';

export interface UpdateSesionesUseCase {
  execute(editarSesiones: EditarSesiones): Promise<RespuestaGrap>;
}

export class UpdateSesionesUseCaseImpl implements UpdateSesionesUseCase {
  constructor(private readonly sesionRepository: SesionRepository) {}

  async execute(editarSesiones: EditarSesiones): Promise<RespuestaGrap> {
    return this.sesionRepository.updateSesiones(editarSesiones);
  }
}
