import { Sesion, SesionRepository, RespuestaGrap } from "../../";

export interface CreateSesionUseCase {
  execute(sesion: Sesion): Promise<RespuestaGrap>;
}

export class CreateSesionUseCaseImpl implements CreateSesionUseCase {
  constructor(private sesionRepository: SesionRepository) {}

  execute(sesion: Sesion): Promise<RespuestaGrap> {
    return this.sesionRepository.createSesion(sesion);
  }
}
