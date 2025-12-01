import { SedeDataSource } from '../../domain/datasources/sede-datasource';
import { pgPool } from '../db/pool';
import { Sede, RespuestaGrap } from '../../domain';
import { sedesQueries } from '../db/sedes-queries';

export class SedeDataSourceImpl implements SedeDataSource {
  private readonly pool = pgPool;

  async getAll(): Promise<Sede[] | RespuestaGrap> {
    try {
      const result = await this.pool.query<Sede>(sedesQueries.sedesResult);
      return result.rows;
    } catch (error: unknown) {
      return {
        exitoso: 'N',
        mensaje:
          'No se pudo obtener sedes: ' +
          (error instanceof Error ? error.message : JSON.stringify(error)),
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
      return {
        exitoso: 'N',
        mensaje:
          'No se pudo obtener la sede: ' +
          (error instanceof Error ? error.message : JSON.stringify(error)),
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
      return {
        exitoso: 'N',
        mensaje:
          'No se pudo crear la sede: ' +
          (error instanceof Error ? error.message : JSON.stringify(error)),
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
      return {
        exitoso: 'N',
        mensaje:
          'No se pudo actualizar la sede: ' +
          (error instanceof Error ? error.message : JSON.stringify(error)),
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
      return {
        exitoso: 'N',
        mensaje:
          'No se pudo eliminar la sede: ' +
          (error instanceof Error ? error.message : JSON.stringify(error)),
      };
    }
  }
}
