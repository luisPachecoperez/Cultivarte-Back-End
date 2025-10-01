import { RespuestaGrap, SesionesDataSource } from "../../domain";
import { pgPool } from "../db/pg-pool";
import { sesionesQueries } from "../db/sesiones-queries";
import { Sesion } from "../../domain/entities/sesion";
import { EditarSesiones } from "../../domain/entities/editar-sesiones";
import { randomUUID } from "crypto";

export class SesionesDataSourceImpl implements SesionesDataSource {
  private pool = pgPool;

  async getAll(
    limit: number,
    offset: number,
  ): Promise<Sesion[] | RespuestaGrap> {
    try {
      const getAllRes = await this.pool.query(sesionesQueries.getAll, [
        limit,
        offset,
      ]);
      return getAllRes.rows as Sesion[]; // ✅ casteo seguro
    } catch (error: unknown) {
      return {
        exitoso: "N",
        mensaje:
          "Error al obtener sesiones: " +
          (error instanceof Error ? error.message : String(error)), // ✅ conversión segura
      };
    }
  }

  async getById(id_sesion: string): Promise<Sesion | RespuestaGrap> {
    try {
      const getByIdRes = await this.pool.query(sesionesQueries.getById, [
        id_sesion,
      ]);

      const sesion = getByIdRes.rows[0] as Sesion | undefined;

      if (!sesion) {
        return {
          exitoso: "N",
          mensaje: "Sesión no encontrada",
        };
      }

      return sesion;
    } catch (error: unknown) {
      return {
        exitoso: "N",
        mensaje:
          "Error al obtener sesiones: " +
          (error instanceof Error ? error.message : String(error)),
      };
    }
  }

  async getSesionesSede(
    id_usuario: string,
    fecha_inicio: string,
    fecha_fin: string,
  ): Promise<Sesion[] | RespuestaGrap> {
    try {
      const getSessionesSedeRes = await this.pool.query(
        sesionesQueries.getSessionesSede,
        [id_usuario, fecha_inicio, fecha_fin],
      );

      // Cast explícito para evitar `any[]`
      return getSessionesSedeRes.rows as Sesion[];
    } catch (error: unknown) {
      console.error("Error en getSesionesSede:", error);
      return {
        exitoso: "N",
        mensaje:
          "Error al obtener sesiones: " +
          (error instanceof Error ? error.message : String(error)),
      };
    }
  }

  async createSesion(sesion: Sesion): Promise<RespuestaGrap> {
    try {
      const id_sesion = sesion.id_sesion || randomUUID();
      const values = [
        id_sesion,
        sesion.id_actividad,
        sesion.fecha_actividad,
        sesion.hora_inicio,
        sesion.hora_fin,
        sesion.imagen,
        sesion.nro_asistentes,
        sesion.descripcion,
        sesion.id_creado_por,
        sesion.fecha_creacion,
        sesion.id_modificado_por,
        sesion.fecha_modificacion,
      ];
      await this.pool.query(sesionesQueries.create, values);
      return { exitoso: "S", mensaje: "Sesion creada correctamente" };
    } catch (error: unknown) {
      return {
        exitoso: "N",
        mensaje:
          "Error al crear sesiones: " +
          (error instanceof Error ? error.message : String(error)),
      };
    }
  }

  async updateById(id_sesion: string, sesion: Sesion): Promise<RespuestaGrap> {
    try {
      const values = [
        id_sesion,
        sesion.id_actividad,
        sesion.fecha_actividad,
        sesion.hora_inicio,
        sesion.hora_fin,
        sesion.imagen,
        sesion.nro_asistentes,
        sesion.descripcion,
        sesion.id_modificado_por,
        sesion.fecha_modificacion,
      ];
      await this.pool.query(sesionesQueries.updateById, values);
      return { exitoso: "S", mensaje: "Sesion actualizada correctamente" };
    } catch (error: unknown) {
      return {
        exitoso: "N",
        mensaje:
          "Error al actualizar sesiones: " +
          (error instanceof Error ? error.message : String(error)),
      };
    }
  }

  async deleteById(id_sesion: string): Promise<RespuestaGrap> {
    try {
      await this.pool.query(sesionesQueries.deleteById, [id_sesion]);
      return { exitoso: "S", mensaje: "Sesion eliminada correctamente" };
    } catch (error: unknown) {
      return {
        exitoso: "N",
        mensaje:
          "Error al eliminar sesiones: " +
          (error instanceof Error ? error.message : String(error)),
      };
    }
  }

  async updateSesiones(editarSesiones: EditarSesiones): Promise<RespuestaGrap> {
    const client = await this.pool.connect();
    try {
      await client.query("BEGIN");

      const { nuevos, modificados, eliminados } = editarSesiones.sesiones;

      // nuevas sesiones
      if (nuevos.length) {
        for (const nuevaSesion of nuevos) {
          const id_sesion = nuevaSesion.id_sesion || randomUUID();
          await client.query(sesionesQueries.create, [
            id_sesion,
            nuevaSesion.id_actividad,
            nuevaSesion.fecha_actividad,
            nuevaSesion.hora_inicio,
            nuevaSesion.hora_fin,
            nuevaSesion.imagen ?? "",
            nuevaSesion.nro_asistentes ?? 0,
            nuevaSesion.descripcion ?? "",
            nuevaSesion.id_creado_por ?? null,
            new Date(),
            nuevaSesion.id_creado_por ?? null,
            new Date(),
          ]);
        }
      }

      // sesiones modificadas
      if (modificados.length) {
        for (const sesionModificada of modificados) {
          console.log("Sesion modificada:", sesionModificada);
          await client.query(sesionesQueries.updateSesionesById, [
            sesionModificada.id_sesion,
            sesionModificada.id_actividad,
            sesionModificada.fecha_actividad,
            sesionModificada.hora_inicio,
            sesionModificada.hora_fin,
            sesionModificada.imagen ?? "",
            sesionModificada.nro_asistentes ?? 0,
            sesionModificada.descripcion ?? "",
            sesionModificada.id_modificado_por ?? null,
            new Date(),
          ]);
        }
      }

      // sesiones eliminadas
      if (eliminados.length) {
        for (const item of eliminados) {
          // si `SesionEliminada` tiene siempre id_sesion, no hace falta typeof
          await client.query(sesionesQueries.deleteById, [item.id_sesion]);
        }
      }

      await client.query("COMMIT");
      return { exitoso: "S", mensaje: "Sesiones actualizadas correctamente" };
    } catch (error) {
      await client.query("ROLLBACK");
      console.error("Error updating sessions:", error);
      return {
        exitoso: "N",
        mensaje: "Error al actualizar sesiones: " + (error as Error).message,
      };
    } finally {
      client.release();
    }
  }
}
