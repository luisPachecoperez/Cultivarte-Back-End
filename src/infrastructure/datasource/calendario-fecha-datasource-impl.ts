import {
  CalendarioFechaDataSource,
  Evento,
  CalendarioInput,
  RespuestaGrap,
} from '../../domain';
import { pgPool } from '../db/pool';
import { calendarioQueries } from '../db/calendario-queries';
import { BaseHomologatedDataSource } from './base-homologated-datasource';

export class CalendarioFechaDataSourceImpl
  extends BaseHomologatedDataSource
  implements CalendarioFechaDataSource
{
  constructor() {
    super(pgPool);
  }

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
      const mensaje = await this.buildErrorMessage(
        'Error al obtener eventos por fecha: ',
        error,
      );
      return {
        exitoso: 'N',
        mensaje,
      };
    }
  }

}
