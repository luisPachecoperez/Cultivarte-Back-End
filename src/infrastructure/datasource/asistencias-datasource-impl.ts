import {
  AsistenciaDataSource,
  Asistencia,
  PreAsistencia,
  AsistenciaSesiones,
  RespuestaGrap,
  Sesion,
  Actividad,
  Beneficiario,
  AsistenteSesion,
  SedeAsistencia,
} from "../../domain";
import { pgPool } from "../db/pg-pool";
import { asistenciasQueries } from "../db/asistencia-queries";
import { sesionesQueries } from "../db/sesiones-queries";

export class AsistenciaDataSourceImpl implements AsistenciaDataSource {
  private pool = pgPool;

  async getAll(): Promise<Asistencia[] | RespuestaGrap> {
    try {
      const result = await this.pool.query(
        asistenciasQueries.asistenciasResult,
      );
      return result.rows as Asistencia[]; // ✅ Tipado seguro
    } catch (error: unknown) {
      return {
        exitoso: "N",
        mensaje: "No se pudo obtener actividades por sedes: " + String(error), // ✅ Forzar a string
      };
    }
  }

  async getById(id_asistencia: string): Promise<Asistencia | RespuestaGrap> {
    try {
      const result = await this.pool.query(
        asistenciasQueries.asistenciasResult,
        [id_asistencia],
      );

      // Hacemos cast explícito para evitar el "any"
      return (result.rows[0] as Asistencia) || null;
    } catch (error: unknown) {
      return {
        exitoso: "N",
        mensaje:
          "No se pudo obtener actividades por sedes: " +
          (error instanceof Error ? error.message : String(error)),
      };
    }
  }

  async getAsistenciasSede(
    id_usuario: string,
    fecha_inicio: string,
    fecha_fin: string,
  ): Promise<Asistencia[] | RespuestaGrap> {
    try {
      const result = await this.pool.query(
        asistenciasQueries.asistenciaSedesResult,
        [id_usuario, fecha_inicio, fecha_fin],
      );

      // Cast explícito del array
      return result.rows as Asistencia[];
    } catch (error: unknown) {
      return {
        exitoso: "N",
        mensaje:
          "No se pudo obtener actividades por sedes: " +
          (error instanceof Error ? error.message : String(error)),
      };
    }
  }

  async createAsistencia(asistencia: Asistencia): Promise<RespuestaGrap> {
    try {
      const result = await this.pool.query(
        asistenciasQueries.insertAsistencia,
        [
          asistencia.id_asistencia,
          asistencia.id_sesion,
          asistencia.id_persona,
          asistencia.id_creado_por,
          asistencia.fecha_creacion,
          asistencia.id_modificado_por,
          asistencia.fecha_modificacion,
        ],
      );

      // Cast explícito para evitar any
      return result.rows[0] as RespuestaGrap;
    } catch (error: unknown) {
      return {
        exitoso: "N",
        mensaje:
          "No se pudo obtener actividades por sedes: " +
          (error instanceof Error ? error.message : String(error)),
      };
    }
  }

  async updateAsistencias(
    asistenciaSesiones: AsistenciaSesiones,
  ): Promise<RespuestaGrap> {
    if (
      asistenciaSesiones.nuevos === null ||
      asistenciaSesiones.nuevos.length === 0
    ) {
      await this.pool.query(asistenciasQueries.updateSesiones, [
        asistenciaSesiones.id_sesion,
        asistenciaSesiones.id_actividad,
        asistenciaSesiones.imagen,
        asistenciaSesiones.numero_asistentes,
        asistenciaSesiones.descripcion,
      ]);
      return {
        exitoso: "S",
        mensaje: "Asistencia actualizada correctamente",
      };
    } else if (asistenciaSesiones.nuevos.length > 0) {
      console.log("entro");
      for (let i = 0; i < asistenciaSesiones.nuevos.length; i++) {
        await this.pool.query(asistenciasQueries.updateAsistencia, [
          asistenciaSesiones.nuevos[i].id_asistencia,
          asistenciaSesiones.nuevos[i].id_sesion,
          asistenciaSesiones.nuevos[i].id_persona,
        ]);
      }
      return {
        exitoso: "S",
        mensaje: "Asistencia actualizada correctamente",
      };
    } else {
      return {
        exitoso: "N",
        mensaje: "No se pudo actualizar la asistencia",
      };
    }
  }

  async updateById(
    id_asistencia: string,
    asistencia: Asistencia,
  ): Promise<RespuestaGrap> {
    try {
      const result = await this.pool.query(
        asistenciasQueries.updateAsistenciaById,
        [
          id_asistencia,
          asistencia.id_sesion,
          asistencia.id_persona,
          asistencia.id_modificado_por,
          asistencia.fecha_modificacion,
        ],
      );

      if (result.rowCount && result.rowCount > 0) {
        return {
          exitoso: "S",
          mensaje: "Asistencia actualizada correctamente",
        };
      } else {
        return {
          exitoso: "N",
          mensaje: "No se encontró la asistencia a actualizar",
        };
      }
    } catch (error: unknown) {
      return {
        exitoso: "N",
        mensaje:
          "No se pudo actualizar la asistencia: " +
          (error instanceof Error ? error.message : String(error)),
      };
    }
  }

  async deleteById(id_asistencia: string): Promise<RespuestaGrap> {
    try {
      const result = await this.pool.query(
        asistenciasQueries.deleteAsistencia,
        [id_asistencia],
      );

      if (result.rowCount && result.rowCount > 0) {
        return {
          exitoso: "S",
          mensaje: "Asistencia eliminada correctamente",
        };
      } else {
        return {
          exitoso: "N",
          mensaje: "No se encontró la asistencia a eliminar",
        };
      }
    } catch (error: unknown) {
      return {
        exitoso: "N",
        mensaje:
          "No se pudo eliminar la asistencia: " +
          (error instanceof Error ? error.message : String(error)),
      };
    }
  }

  async getPreAsistencia(
    id_sesion: string,
  ): Promise<PreAsistencia | RespuestaGrap> {
    try {
      console.log("id_sesion:", id_sesion);
      const sesionResult = await this.pool.query(sesionesQueries.getById, [
        id_sesion,
      ]);

      const sesion: Sesion | null = (sesionResult.rows[0] as Sesion) || null;
      console.log("sesion object:", JSON.stringify(sesion, null, 2));

      if (!sesion) {
        return {
          exitoso: "N",
          mensaje: "Sesión no encontrada",
        };
      }

      // Derivar id_actividad desde la sesión para garantizar consistencia
      const actividadId = sesion.id_actividad;
      const actividadResult = await this.pool.query(
        asistenciasQueries.actividadResult,
        [actividadId],
      );
      const actividad: Actividad | null =
        (actividadResult.rows[0] as Actividad) || null;

      if (!actividad) {
        return {
          exitoso: "N",
          mensaje: "No se encontró la actividad asociada a la sesión",
        };
      }

      // Ejecutar consultas independientes en paralelo
      try {
        const [sedesResult, beneficiariosResult, asistentesSesionesResult] =
          await Promise.all([
            this.pool.query<SedeAsistencia>(asistenciasQueries.getSedes),
            this.pool.query<Beneficiario>(
              asistenciasQueries.beneficiariosResult,
            ),
            this.pool.query<AsistenteSesion>(
              asistenciasQueries.getAsistentesSesiones,
              [id_sesion],
            ),
          ]);

        // Obtener parámetros de la actividad
        interface ParametroActividad {
          nombre: string;
        }

        // Dentro de tu función
        const parametrosResult = await this.pool.query<ParametroActividad>(
          asistenciasQueries.parametrosDetalleActividadResult,
          [actividad.id_tipo_actividad],
        );

        // Aseguramos el tipo correcto en vez de any
        const parametro_actividad: ParametroActividad | undefined =
          parametrosResult.rows[0];

        const foto =
          parametro_actividad?.nombre === "Actividad institucional" ||
          parametro_actividad?.nombre === "Ludoteca viajera"
            ? "S"
            : "N";

        // // Tipamos cada query según lo que debe devolver
        // const sedesResult = await this.pool.query<Sede>(
        //   asistenciasQueries.getSedes,
        //   [actividad.id_sede],
        // );

        // const beneficiariosResult = await this.pool.query<Beneficiario>(
        //   asistenciasQueries.beneficiariosResult,
        //   [actividad.id_actividad],
        // );

        // const asistentesSesionesResult = await this.pool.query<AsistenteSesion>(
        //   asistenciasQueries.getAsistentesSesiones,
        //   [sesion.id_sesion],
        // );

        // Ahora construimos el objeto
        const preAsistencia: PreAsistencia = {
          id_sesion: sesion.id_sesion,
          id_sede: actividad.id_sede || "1", // Usar id_sede de la actividad o valor por defecto
          numero_asistentes: Number(sesion.nro_asistentes) || 0,
          foto: foto,
          descripcion: sesion.descripcion || "",
          imagen: sesion.imagen || "",
          sedes: sedesResult.rows, // ✅ ya es SedeAsistencia[]
          beneficiarios: beneficiariosResult.rows, // ✅ ya es Beneficiario[]
          asistentes_sesiones: asistentesSesionesResult.rows, // ✅ ya es AsistenteSesion[]
        };

        console.log(
          "preAsistencia object:",
          JSON.stringify(preAsistencia, null, 2),
        );
        return preAsistencia;
      } catch (error: unknown) {
        console.error("Error en consultas de pre-asistencia:", error);

        return {
          exitoso: "N",
          // ✅ Convertimos el error a string de forma segura
          mensaje:
            "Error al obtener datos de pre-asistencia: " +
            (error instanceof Error ? error.message : String(error)),
        };
      }
    } catch (error: unknown) {
      console.error("Error general en getPreAsistencia:", error); // ✅ así ya usamos `error`
      return {
        exitoso: "N",
        mensaje: "No se pudo obtener la pre-asistencia",
      };
    }
  }
}
