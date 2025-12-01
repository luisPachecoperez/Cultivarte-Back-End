import {
  Actividad,
  ActividadRepository,
  ParametroDetalleRepository,
  RespuestaGrap,
} from '../..';

export interface CreateActividadAndSesionesUseCase {
  execute(actividad: Actividad): Promise<Actividad | RespuestaGrap>;
}

export class CreateActividadAndSesionesUseCaseImpl
  implements CreateActividadAndSesionesUseCase
{
  constructor(
    private readonly actividadRepository: ActividadRepository,
    private readonly parametroDetalleRepository: ParametroDetalleRepository,
  ) {}

  async execute(actividad: Actividad): Promise<Actividad | RespuestaGrap> {
    try {
      const frecuencia = await this.parametroDetalleRepository.getById(
        actividad.id_frecuencia,
      );
      if (!frecuencia) {
        return { exitoso: 'N', mensaje: 'Frecuencia no encontrada' };
      }
      if ('nombre' in frecuencia) {
        actividad.frecuencia = frecuencia.nombre;
      } else {
        return { exitoso: 'N', mensaje: 'Frecuencia no encontrada' };
      }
      return this.actividadRepository.createActividadAndSesiones(actividad);
    } catch (error: unknown) {
      return {
        exitoso: 'N',
        mensaje: error instanceof Error ? error.message : JSON.stringify(error),
      };
    }
  }
}
