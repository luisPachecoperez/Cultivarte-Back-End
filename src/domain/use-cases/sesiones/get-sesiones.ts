import { Sesion, SesionRepository, RespuestaGrap } from '../../';

export interface GetSesionesUseCase {
  execute(limit: number, offset: number): Promise<Sesion[] | RespuestaGrap>;
}

export class GetSesionesUseCaseImpl implements GetSesionesUseCase {
  constructor(private readonly sesionRepository: SesionRepository) {}

  execute(limit: number, offset: number): Promise<Sesion[] | RespuestaGrap> {
    return this.sesionRepository.getAll(limit, offset);
  }
}
