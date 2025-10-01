import {
  ParametrosGenerales,
  RespuestaGrap,
  ParametrosGeneralesDataSource,
} from "../../domain";
import { pgPool } from "../db/pg-pool";
import { parametrosGeneralesQueries } from "../db/parametros-generales-queries";

export class ParametrosGeneralesDataSourceImpl
  implements ParametrosGeneralesDataSource
{
  private pool = pgPool;

  async getAll(): Promise<ParametrosGenerales[] | RespuestaGrap> {
    try {
      const res = await this.pool.query(parametrosGeneralesQueries.getAll);
      return res.rows as ParametrosGenerales[];
    } catch (error: unknown) {
      return {
        exitoso: "N",
        mensaje:
          "Error al obtener los parametros generales: " +
          (error instanceof Error ? error.message : String(error)),
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
      return {
        exitoso: "N",
        mensaje:
          "Error al obtener parametro general: " +
          (error instanceof Error ? error.message : String(error)),
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
        exitoso: "S",
        mensaje: "Parametro general creado correctamente",
      };
    } catch (error: unknown) {
      return {
        exitoso: "N",
        mensaje:
          "Error al crear parametro general: " +
          (error instanceof Error ? error.message : String(error)),
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
        exitoso: "S",
        mensaje: "Parametro general actualizado correctamente",
      };
    } catch (error: unknown) {
      return {
        exitoso: "N",
        mensaje:
          "Error al actualizar parametro general: " +
          (error instanceof Error ? error.message : String(error)),
      };
    }
  }

  async deleteById(id_parametro_general: string): Promise<RespuestaGrap> {
    try {
      await this.pool.query(parametrosGeneralesQueries.deleteById, [
        id_parametro_general,
      ]);
      return {
        exitoso: "S",
        mensaje: "Parametro general eliminado correctamente",
      };
    } catch (error: unknown) {
      return {
        exitoso: "N",
        mensaje:
          "Error al eliminar parametro general: " +
          (error instanceof Error ? error.message : String(error)),
      };
    }
  }
}
