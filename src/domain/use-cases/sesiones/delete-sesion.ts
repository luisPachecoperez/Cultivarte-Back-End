import { RespuestaGrap, SesionRepository } from '../../';

export interface DeleteSesionUseCase {
  execute(id_sesion: string): Promise<RespuestaGrap>;
}

export class DeleteSesionUseCaseImpl implements DeleteSesionUseCase {
  constructor(private readonly sesionRepository: SesionRepository) {}

  execute(id_sesion: string): Promise<RespuestaGrap> {
    return this.sesionRepository.deleteById(id_sesion);
  }
}
