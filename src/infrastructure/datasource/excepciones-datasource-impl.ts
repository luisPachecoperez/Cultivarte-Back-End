import {
  EditarExcepciones,
  ExcepcionModificable,
} from '@/domain/entities/excepciones';
import { pgPool } from '../db/pool';
import { RespuestaGrap } from '@/domain';
import { ExcepcionesDataSource } from '@/domain/datasources/excepciones-datasource';
import { excepcionesQueries } from '../db/excepciones-queries';
import { BaseHomologatedDataSource } from './base-homologated-datasource';

export class ExcepcionesDataSourceImpl
  extends BaseHomologatedDataSource
  implements ExcepcionesDataSource
{
  constructor() {
    super(pgPool);
  }
  async getExcepciones(): Promise<ExcepcionModificable[] | RespuestaGrap> {
    try {
      const result = await this.pool.query(excepcionesQueries.getExcepciones);
      return result.rows as ExcepcionModificable[];
    } catch (error: unknown) {
      const mensaje = await this.buildErrorMessage(
        'Error al obtener excepciones: ',
        error,
      );
      return {
        exitoso: 'N',
        mensaje,
      };
    }
  }

  async UpdateExcepciones(
    excepciones: EditarExcepciones,
  ): Promise<RespuestaGrap> {
    try {
      console.log('Excepciones a procesar:', excepciones);
      if (excepciones.nuevos.length > 0) {
        for (const nuevaExcepcion of excepciones.nuevos) {
          await this.pool.query(excepcionesQueries.createExcepcion, [
            nuevaExcepcion.id_excepcion,
            nuevaExcepcion.error,
            nuevaExcepcion.mensaje,
            nuevaExcepcion.id_creado_por,
            nuevaExcepcion.fecha_creacion,
            nuevaExcepcion.fecha_modificacion,
          ]);
        }
      }
      if (excepciones.modificados.length > 0) {
        for (const excepcionActualizada of excepciones.modificados) {
          await this.pool.query(excepcionesQueries.updateExcepciones, [
            excepcionActualizada.id_excepcion,
            excepcionActualizada.error,
            excepcionActualizada.mensaje,
            excepcionActualizada.fecha_modificacion,
          ]);
        }
      }
      if (excepciones.eliminados.length > 0) {
        console.log('Excepciones a eliminar:', excepciones.eliminados);
        for (const idExcepcion of excepciones.eliminados) {
          await this.pool.query(excepcionesQueries.deleteExcepciones, [
            idExcepcion.id_excepcion,
          ]);
        }
      }
      return {
        exitoso: 'S',
        mensaje: 'Excepción actualizada correctamente',
      };
    } catch (error: unknown) {
      const mensaje = await this.buildErrorMessage(
        'Error al actualizar excepciones: ',
        error,
      );
      return {
        exitoso: 'N',
        mensaje,
      };
    }
  }

}
