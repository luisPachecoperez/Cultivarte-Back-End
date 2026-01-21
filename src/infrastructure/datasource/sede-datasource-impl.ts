import { SedeDataSource } from '../../domain/datasources/sede-datasource';
import { pgPool } from '../db/pool';
import { Sede, RespuestaGrap } from '../../domain';
import { sedesQueries } from '../db/sedes-queries';
import { BaseHomologatedDataSource } from './base-homologated-datasource';

export class SedeDataSourceImpl
  extends BaseHomologatedDataSource
  implements SedeDataSource
{
  constructor() {
    super(pgPool);
  }

  async getAll(): Promise<Sede[] | RespuestaGrap> {
    try {
      const result = await this.pool.query<Sede>(sedesQueries.sedesResult);
      return result.rows;
    } catch (error: unknown) {
      const mensaje = await this.buildErrorMessage(
        'Error al obtener sedes: ',
        error,
      );
      return {
        exitoso: 'N',
        mensaje,
      };
    }
  }

  async getById(id_sede: string): Promise<Sede | RespuestaGrap> {
    try {
      const result = await this.pool.query<Sede>(sedesQueries.sedeById, [
        id_sede,
      ]);
      if (result.rowCount === 0) {
        return {
          exitoso: 'N',
          mensaje: 'No se encontró la sede con id: ' + id_sede,
        };
      }
      return result.rows[0];
    } catch (error: unknown) {
      const mensaje = await this.buildErrorMessage(
        'Error al obtener la sede: ',
        error,
      );
      return {
        exitoso: 'N',
        mensaje,
      };
    }
  }

  async create(sede: Sede): Promise<RespuestaGrap> {
    try {
      await this.pool.query(sedesQueries.createSede, [sede]);
      return {
        exitoso: 'S',
        mensaje: 'Sede creada exitosamente',
      };
    } catch (error: unknown) {
      const mensaje = await this.buildErrorMessage(
        'Error al crear la sede: ',
        error,
      );
      return {
        exitoso: 'N',
        mensaje,
      };
    }
  }

  async updateById(id_sede: string, sede: Sede): Promise<RespuestaGrap> {
    try {
      await this.pool.query(sedesQueries.updateSede, [id_sede, sede]);
      return {
        exitoso: 'S',
        mensaje: 'Sede actualizada exitosamente',
      };
    } catch (error: unknown) {
      const mensaje = await this.buildErrorMessage(
        'Error al actualizar la sede: ',
        error,
      );
      return {
        exitoso: 'N',
        mensaje,
      };
    }
  }

  async deleteById(id_sede: string): Promise<RespuestaGrap> {
    try {
      await this.pool.query(sedesQueries.deleteSede, [id_sede]);
      return {
        exitoso: 'S',
        mensaje: 'Sede eliminada exitosamente',
      };
    } catch (error: unknown) {
      const mensaje = await this.buildErrorMessage(
        'Error al eliminar la sede: ',
        error,
      );
      return {
        exitoso: 'N',
        mensaje,
      };
    }
  }

}
