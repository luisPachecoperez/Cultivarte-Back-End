import {
  CalendarioFechaDataSource,
  Evento,
  CalendarioInput,
  RespuestaGrap,
} from '../../domain';
import { pgPool } from '../db/pool';
import { calendarioQueries } from '../db/calendario-queries';

export class CalendarioFechaDataSourceImpl
  implements CalendarioFechaDataSource
{
  private readonly pool = pgPool;

  async getByDate(
    calendarioInput: CalendarioInput,
  ): Promise<Evento[] | RespuestaGrap> {
    try {
      const result = await this.pool.query(calendarioQueries.getByDate, [
        calendarioInput.fecha_inicial,
        calendarioInput.fecha_final,
      ]);

      // 🔹 Mapeamos rows para asegurar que cumplan con Evento[]
      const eventos: Evento[] = result.rows as Evento[];

      return eventos;
    } catch (error: unknown) {
      return {
        exitoso: 'N',
        mensaje:
          'Error al obtener eventos por fecha: ' +
          (error instanceof Error ? error.message : JSON.stringify(error)),
      };
    }
  }
}
