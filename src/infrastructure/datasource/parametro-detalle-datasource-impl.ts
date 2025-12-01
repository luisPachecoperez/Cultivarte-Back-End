import {
  ParametroDetalle,
  ParametroDetalleDataSource,
  RespuestaGrap,
} from '../../domain';
import { pgPool } from '../db/pool';
import { parametrosDetalleQueries } from '../db/parametros-detalle-queries';

export class ParametroDetalleDataSourceImpl
  implements ParametroDetalleDataSource
{
  private readonly pool = pgPool;

  async getAll(): Promise<ParametroDetalle[]> {
    const getAllRes = await this.pool.query(parametrosDetalleQueries.getAll);
    return getAllRes.rows as ParametroDetalle[];
  }

  async getById(
    id_parametro_detalle: string,
  ): Promise<ParametroDetalle | RespuestaGrap> {
    try {
      const getByIdRes = await this.pool.query(
        parametrosDetalleQueries.getById,
        [id_parametro_detalle],
      );
      return (getByIdRes.rows[0] as ParametroDetalle) || null;
    } catch (error: unknown) {
      const mensaje =
        error instanceof Error ? error.message : JSON.stringify(error);
      return {
        exitoso: 'N',
        mensaje: `Error al obtener parametro detalle: ${mensaje}`,
      };
    }
  }

  async create(
    parametroDetalle: ParametroDetalle,
  ): Promise<ParametroDetalle | RespuestaGrap> {
    try {
      const values = [
        parametroDetalle.id_parametro_general,
        parametroDetalle.nombre,
        parametroDetalle.codigo,
        parametroDetalle.orden,
        parametroDetalle.valores,
        parametroDetalle.estado,
      ];
      const result = await this.pool.query(
        parametrosDetalleQueries.create,
        values,
      );
      return (result.rows[0] as ParametroDetalle) || null;
    } catch (error: unknown) {
      const mensaje =
        error instanceof Error ? error.message : JSON.stringify(error);
      return {
        exitoso: 'N',
        mensaje: `Error al crear parametro detalle: ${mensaje}`,
      };
    }
  }

  async updateById(
    id_parametro_detalle: string,
    parametroDetalle: ParametroDetalle,
  ): Promise<ParametroDetalle | RespuestaGrap> {
    try {
      const values = [
        id_parametro_detalle,
        parametroDetalle.nombre,
        parametroDetalle.codigo,
        parametroDetalle.orden,
        parametroDetalle.valores,
        parametroDetalle.estado,
      ];

      const result = await this.pool.query(
        parametrosDetalleQueries.updateById,
        values,
      );
      return (result.rows[0] as ParametroDetalle) || null;
    } catch (error: unknown) {
      const mensaje =
        error instanceof Error ? error.message : JSON.stringify(error);
      return {
        exitoso: 'N',
        mensaje: `Error al actualizar parametro detalle: ${mensaje}`,
      };
    }
  }

  async deleteById(id_parametro_detalle: string): Promise<RespuestaGrap> {
    try {
      await this.pool.query(parametrosDetalleQueries.deleteById, [
        id_parametro_detalle,
      ]);
      return {
        exitoso: 'S',
        mensaje: 'Parametro detalle eliminado correctamente',
      };
    } catch (error: unknown) {
      const mensaje =
        error instanceof Error ? error.message : JSON.stringify(error);
      return {
        exitoso: 'N',
        mensaje: `Error al eliminar parametro detalle: ${mensaje}`,
      };
    }
  }
}
