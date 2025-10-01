import { RespuestaGrap, Sesion, SesionRepository } from "../../";

export interface UpdateSesionUseCase {
  execute(id_sesion: string, sesion: Sesion): Promise<RespuestaGrap>;
}

export class UpdateSesionUseCaseImpl implements UpdateSesionUseCase {
  constructor(private sesionRepository: SesionRepository) {}

  execute(id_sesion: string, sesion: Sesion): Promise<RespuestaGrap> {
    return this.sesionRepository.updateById(id_sesion, sesion);
  }
}
