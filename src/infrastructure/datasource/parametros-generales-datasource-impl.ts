import {
  ParametrosGenerales,
  RespuestaGrap,
  ParametrosGeneralesDataSource,
} from '../../domain';
import { pgPool } from '../db/pool';
import { parametrosGeneralesQueries } from '../db/parametros-generales-queries';
import { BaseHomologatedDataSource } from './base-homologated-datasource';

export class ParametrosGeneralesDataSourceImpl
  extends BaseHomologatedDataSource
  implements ParametrosGeneralesDataSource
{
  constructor() {
    super(pgPool);
  }

  async getAll(): Promise<ParametrosGenerales[] | RespuestaGrap> {
    try {
      const res = await this.pool.query(parametrosGeneralesQueries.getAll);
      return res.rows as ParametrosGenerales[];
    } catch (error: unknown) {
      const mensaje = await this.buildErrorMessage(
        'Error al obtener los parametros generales: ',
        error,
      );
      return {
        exitoso: 'N',
        mensaje,
      };
    }
  }

  async getById(
    id_parametro_general: string,
  ): Promise<ParametrosGenerales | RespuestaGrap> {
    try {
      const getByIdRes = await this.pool.query(
        parametrosGeneralesQueries.getById,
        [id_parametro_general],
      );
      return (getByIdRes.rows[0] as ParametrosGenerales) || null;
    } catch (error: unknown) {
      const mensaje = await this.buildErrorMessage(
        'Error al obtener parametro general: ',
        error,
      );
      return {
        exitoso: 'N',
        mensaje,
      };
    }
  }

  async create(
    parametrosGenerales: ParametrosGenerales,
  ): Promise<RespuestaGrap> {
    try {
      const values = [
        parametrosGenerales.nombre_parametro,
        parametrosGenerales.descripcion,
        parametrosGenerales.estado,
      ];
      await this.pool.query(parametrosGeneralesQueries.create, values);
      return {
        exitoso: 'S',
        mensaje: 'Parametro general creado correctamente',
      };
    } catch (error: unknown) {
      const mensaje = await this.buildErrorMessage(
        'Error al crear parametro general: ',
        error,
      );
      return {
        exitoso: 'N',
        mensaje,
      };
    }
  }

  async updateById(
    id_parametro_general: string,
    parametrosGenerales: ParametrosGenerales,
  ): Promise<RespuestaGrap> {
    try {
      const values = [
        id_parametro_general,
        parametrosGenerales.nombre_parametro,
        parametrosGenerales.descripcion,
        parametrosGenerales.estado,
      ];
      await this.pool.query(parametrosGeneralesQueries.updateById, values);

      return {
        exitoso: 'S',
        mensaje: 'Parametro general actualizado correctamente',
      };
    } catch (error: unknown) {
      const mensaje = await this.buildErrorMessage(
        'Error al actualizar parametro general: ',
        error,
      );
      return {
        exitoso: 'N',
        mensaje,
      };
    }
  }

  async deleteById(id_parametro_general: string): Promise<RespuestaGrap> {
    try {
      await this.pool.query(parametrosGeneralesQueries.deleteById, [
        id_parametro_general,
      ]);
      return {
        exitoso: 'S',
        mensaje: 'Parametro general eliminado correctamente',
      };
    } catch (error: unknown) {
      const mensaje = await this.buildErrorMessage(
        'Error al eliminar parametro general: ',
        error,
      );
      return {
        exitoso: 'N',
        mensaje,
      };
    }
  }

}
