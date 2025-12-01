import { Actividad, ActividadRepository, RespuestaGrap } from '../..';

export interface GetActividadesUseCase {
  execute(limit: number, offset: number): Promise<Actividad[] | RespuestaGrap>;
}

export class GetActividadesUseCaseImpl implements GetActividadesUseCase {
  constructor(private readonly actividadRepository: ActividadRepository) {}

  execute(limit: number, offset: number): Promise<Actividad[] | RespuestaGrap> {
    return this.actividadRepository.getAll(limit, offset);
  }
}
