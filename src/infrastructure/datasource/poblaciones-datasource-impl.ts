import { pgPool } from "../db/pg-pool";
import { Poblacion, RespuestaGrap, PoblacionDataSource } from "../../domain";
import { randomUUID } from "crypto";
import { poblacionesQueries } from "../db/poblaciones-queries";

export class PoblacionDataSourceImpl implements PoblacionDataSource {
  private pool = pgPool;

  async getPoblaciones(): Promise<Poblacion[] | RespuestaGrap> {
    try {
      const result = await this.pool.query(
        poblacionesQueries.poblacionesResult,
      );
      return result.rows as Poblacion[];
    } catch (error: unknown) {
      const mensaje = error instanceof Error ? error.message : String(error);
      return {
        exitoso: "N",
        mensaje: `No se pudo obtener poblaciones: ${mensaje}`,
      };
    }
  }

  async getPoblacionById(
    id_poblacion: string,
  ): Promise<Poblacion | RespuestaGrap> {
    try {
      const result = await this.pool.query(poblacionesQueries.poblacionById, [
        id_poblacion,
      ]);

      if (result.rowCount === 0) {
        return {
          exitoso: "N",
          mensaje: "No se encontró la población con el ID proporcionado",
        };
      }

      return result.rows[0] as Poblacion;
    } catch (error: unknown) {
      const mensaje = error instanceof Error ? error.message : String(error);
      console.error("Error en getPoblacionById:", mensaje);
      return {
        exitoso: "N",
        mensaje: `Error al obtener la población: ${mensaje}`,
      };
    }
  }

  async createPoblacion(poblacion: Poblacion): Promise<RespuestaGrap> {
    try {
      const result = await this.pool.query(poblacionesQueries.createPoblacion, [
        poblacion.id_poblacion || randomUUID(),
        poblacion.id_padre || null,
        poblacion.nombre,
      ]);

      if (!result.rows[0]) {
        return {
          exitoso: "N",
          mensaje: "No se pudo crear la población",
        };
      }

      return {
        exitoso: "S",
        mensaje: "Población creada exitosamente",
      };
    } catch (error: unknown) {
      const mensaje = error instanceof Error ? error.message : String(error);
      console.error("Error en createPoblacion:", mensaje);
      return {
        exitoso: "N",
        mensaje: `No se pudo crear la población: ${mensaje}`,
      };
    }
  }

  async updatePoblacionById(
    id_poblacion: string,
    poblacion: Poblacion,
  ): Promise<RespuestaGrap> {
    try {
      const result = await this.pool.query(poblacionesQueries.updatePoblacion, [
        id_poblacion,
        poblacion.nombre,
      ]);
      return (result.rows[0] as RespuestaGrap) || null;
    } catch (error: unknown) {
      const mensaje = error instanceof Error ? error.message : String(error);
      return {
        exitoso: "N",
        mensaje: `No se pudo actualizar poblacion: ${mensaje}`,
      };
    }
  }

  async deletePoblacionById(id_poblacion: string): Promise<RespuestaGrap> {
    try {
      const result = await this.pool.query(poblacionesQueries.deletePoblacion, [
        id_poblacion,
      ]);
      return (result.rows[0] as RespuestaGrap) || null;
    } catch (error: unknown) {
      const mensaje = error instanceof Error ? error.message : String(error);
      return {
        exitoso: "N",
        mensaje: `No se pudo eliminar poblacion: ${mensaje}`,
      };
    }
  }
}
