import { Sesion, SesionRepository, RespuestaGrap } from '../../';

export interface GetSesionUseCase {
  execute(id_sesion: string): Promise<Sesion | RespuestaGrap>;
}

export class GetSesionUseCaseImpl implements GetSesionUseCase {
  constructor(private readonly sesionRepository: SesionRepository) {}

  execute(id_sesion: string): Promise<Sesion | RespuestaGrap> {
    return this.sesionRepository.getById(id_sesion);
  }
}
