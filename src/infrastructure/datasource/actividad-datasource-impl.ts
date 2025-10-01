import {
  PreCreateActividad,
  ActividadDataSource,
  RespuestaGrap,
  Sesion,
} from "../../domain";
import {
  SedeItem,
  FrecuenciaItem,
  NombresActividad,
  TipoActividadItem,
  AliadoItem,
  ResponsableItem,
} from "../../domain/entities/pre-create-actividad";
import { pgPool } from "../db/pg-pool";
import { Actividad } from "../../domain/entities/actividad";
import { actividadQueries } from "../db/actividad-queries";
import { randomUUID } from "crypto";
import { PreEditActividad } from "../../domain/entities/pre-edit-actividad";

export class ActividadDataSourceImpl implements ActividadDataSource {
  private pool = pgPool;

  async getPreCreateActividad(
    id_usuario: string,
  ): Promise<PreCreateActividad | RespuestaGrap> {
    const client = await this.pool.connect();
    try {
      // Ejecutar consultas en paralelo
      const [
        programaRes,
        sedesRes,
        tiposDeActividadRes,
        aliadosRes,
        responsablesRes,
        nombreDeActividadRes,
        frecuenciasRes,
      ] = await Promise.all([
        client.query<{ id_programa: string }>(actividadQueries.programaRes, [
          id_usuario,
        ]),
        client.query<SedeItem>(actividadQueries.sedesResult, [id_usuario]),
        client.query<TipoActividadItem>(
          actividadQueries.tiposDeActividadResult,
        ),
        client.query<AliadoItem>(actividadQueries.aliadosResult),
        client.query<ResponsableItem>(actividadQueries.responsablesResult),
        client.query<{
          id_tipo_actividad: string;
          nombre: string;
          valores?: string;
        }>(actividadQueries.nombreDeActividadResult),
        client.query<FrecuenciaItem>(actividadQueries.frecuenciasResult),
      ]);

      // id_programa seguro
      const id_programa: string = programaRes.rows?.[0]?.id_programa ?? "";

      // Sedes con fallback a todas las sedes si no tiene asignadas
      let sedes: SedeItem[] = sedesRes.rows ?? [];
      if (sedes.length === 0) {
        const allSedesResult = await client.query<SedeItem>(
          actividadQueries.allSedesResult,
        );
        sedes = allSedesResult.rows ?? [];
      }

      const tiposDeActividad: TipoActividadItem[] =
        tiposDeActividadRes.rows ?? [];
      const aliados: AliadoItem[] = aliadosRes.rows ?? [];
      const responsables: ResponsableItem[] = responsablesRes.rows ?? [];

      // Construcción de nombreDeActividad respetando la interfaz
      const nombreEventosRows = nombreDeActividadRes.rows ?? [];
      const nombresDeActividad: NombresActividad[] = [];

      for (const row of nombreEventosRows) {
        const id_tipo_actividad = row.id_tipo_actividad;
        const nombreBase = row.nombre;

        if (!id_tipo_actividad || !nombreBase) continue;

        if (row.valores) {
          const valores = row.valores.split(",").map((v) => v.trim());
          for (const nombre of valores) {
            if (!nombre) continue;
            nombresDeActividad.push({ id_tipo_actividad, nombre });
          }
        }
      }

      const frecuencias: FrecuenciaItem[] = frecuenciasRes.rows ?? [];

      const preCreateEventData: PreCreateActividad = {
        id_programa,
        sedes,
        tiposDeActividad,
        aliados,
        responsables,
        nombresDeActividad,
        frecuencias,
      };

      return preCreateEventData;
    } catch (error) {
      console.error("Error in getPreCreateActividad:", error);
      return {
        exitoso: "N",
        mensaje:
          "Error al obtener pre-create actividad: " + (error as Error).message,
      };
    } finally {
      client.release();
    }
  }

  async getPreEditActividad(
    id_actividad: string,
    id_usuario: string,
  ): Promise<PreEditActividad | RespuestaGrap> {
    try {
      // Ejecutar consultas independientes en paralelo con tipado seguro
      const [
        programaRes,
        sedesRes,
        tiposDeActividadRes,
        aliadosRes,
        responsablesRes,
        nombreDeActividadRes,
        frecuenciasRes,
        actividadRes,
        sesionesRes,
      ] = await Promise.all([
        this.pool.query<{ id_programa: string }>(actividadQueries.programaRes, [
          id_usuario,
        ]),
        this.pool.query<SedeItem>(actividadQueries.sedesResult, [id_usuario]),
        this.pool.query<TipoActividadItem>(
          actividadQueries.tiposDeActividadResult,
        ),
        this.pool.query<AliadoItem>(actividadQueries.aliadosResult),
        this.pool.query<ResponsableItem>(actividadQueries.responsablesResult),
        this.pool.query<{
          id_tipo_actividad: string;
          nombre: string;
          valores?: string;
        }>(actividadQueries.nombreDeActividadResult),
        this.pool.query<FrecuenciaItem>(actividadQueries.frecuenciasResult),
        this.pool.query<Actividad>(actividadQueries.actividadResult, [
          id_actividad,
        ]),
        this.pool.query<Sesion>(actividadQueries.sesionesResult, [
          id_actividad,
        ]),
      ]);

      // id_programa validation
      const id_programa: string = programaRes.rows?.[0]?.id_programa ?? "";
      if (!id_programa) {
        return {
          exitoso: "N",
          mensaje: "No se pudo determinar el programa para el usuario.",
        };
      }

      // Sedes con fallback a todas las sedes si no tiene asignadas
      // Sedes con fallback a todas las sedes si no tiene asignadas
      let sedes: SedeItem[] = sedesRes.rows ?? [];
      if (sedes.length === 0) {
        const allSedesResult = await this.pool.query<SedeItem>(
          actividadQueries.allSedesResult,
        );
        sedes = allSedesResult.rows ?? [];
      }

      const tiposDeActividad: TipoActividadItem[] =
        tiposDeActividadRes.rows ?? [];
      const aliados: AliadoItem[] = aliadosRes.rows ?? [];
      const responsables: ResponsableItem[] = responsablesRes.rows ?? [];

      // Get actividad and validate it exists
      const actividad: Actividad | undefined = actividadRes.rows?.[0];

      if (!actividad) {
        console.error("No se encontró la actividad con ID:", id_actividad);
        return {
          exitoso: "N",
          mensaje: "No se encontró la actividad con el ID proporcionado.",
        };
      }

      // Format actividad dates
      if (actividad.fecha_actividad) {
        actividad.fecha_actividad = this.formatDateToYYYYMMDD(
          actividad.fecha_actividad,
        );
      }
      if (actividad.fecha_creacion) {
        actividad.fecha_creacion = this.formatDateToYYYYMMDD(
          actividad.fecha_creacion,
        );
      }
      if (actividad.fecha_modificacion) {
        actividad.fecha_modificacion = this.formatDateToYYYYMMDD(
          actividad.fecha_modificacion,
        );
      }

      const sesiones: Sesion[] = sesionesRes.rows ?? [];

      // Format session dates
      sesiones.forEach((sesion) => {
        if (sesion.fecha_actividad) {
          sesion.fecha_actividad = this.formatDateToYYYYMMDD(
            sesion.fecha_actividad,
          );
        }
        if (sesion.fecha_creacion) {
          sesion.fecha_creacion = this.formatDateToYYYYMMDD(
            sesion.fecha_creacion,
          );
        }
        if (sesion.fecha_modificacion) {
          sesion.fecha_modificacion = this.formatDateToYYYYMMDD(
            sesion.fecha_modificacion,
          );
        }
      });

      // Construcción de nombreDeActividad respetando la interfaz NombreActividad { id_tipo_actividad, nombre }
      const nombreEventosRows = nombreDeActividadRes.rows ?? [];
      const nombresDeActividad: NombresActividad[] = [];

      for (const row of nombreEventosRows) {
        // Asegurar un id válido; si no existe, saltar la fila
        const id_tipo_actividad = row?.id_tipo_actividad;
        const nombreBase = row?.nombre;

        if (!id_tipo_actividad || !nombreBase) continue;

        try {
          if (row?.valores) {
            const valores = row.valores.split(",").map((v: string) => v.trim());
            for (const nombre of valores) {
              if (!nombre) continue;
              nombresDeActividad.push({ id_tipo_actividad, nombre });
            }
          }
        } catch {
          /* ignore malformed JSON */
          nombresDeActividad.push({ id_tipo_actividad: "", nombre: "" });
        }
      }

      const frecuencias: FrecuenciaItem[] = frecuenciasRes.rows ?? [];
      const preEditEventData: PreEditActividad = {
        id_programa,
        sedes,
        tiposDeActividad,
        aliados,
        responsables,
        nombresDeActividad,
        frecuencias,
        actividad,
        sesiones,
      };

      return preEditEventData;
    } catch (error) {
      console.error("Error in getPreEditActividad:", error);
      return {
        exitoso: "N",
        mensaje:
          "Error al obtener datos para editar actividad: " + String(error),
      };
    }
  }

  async getAll(
    limit: number,
    offset: number,
  ): Promise<Actividad[] | RespuestaGrap> {
    try {
      const result = await this.pool.query(actividadQueries.actividadesResult, [
        limit,
        offset,
      ]);
      return result.rows as Actividad[];
    } catch (error) {
      return {
        exitoso: "N",
        mensaje: "No se pudo obtener actividades: " + String(error),
      };
    }
  }

  async getById(id_actividad: string): Promise<Actividad | RespuestaGrap> {
    try {
      const result = await this.pool.query<Actividad>(
        actividadQueries.actividadResult,
        [id_actividad],
      );

      const actividad = result.rows[0] as Actividad | undefined;

      if (!actividad) {
        return {
          exitoso: "N",
          mensaje: "No se encontró la actividad solicitada.",
        };
      }

      return actividad;
    } catch (error) {
      return {
        exitoso: "N",
        mensaje:
          "No se pudo obtener actividad: " +
          (error instanceof Error ? error.message : String(error)),
      };
    }
  }

  async getActividadSedes(
    id_usuario: string,
    fecha_inicio: string,
    fecha_fin: string,
  ): Promise<Actividad[] | RespuestaGrap> {
    try {
      const result = await this.pool.query<Actividad>(
        actividadQueries.actividadSedesResult,
        [fecha_inicio, fecha_fin, id_usuario],
      );

      // Tipar explícitamente los rows como Actividad[]
      return result.rows;
    } catch (error) {
      return {
        exitoso: "N",
        mensaje:
          "No se pudo obtener actividades por sedes: " +
          (error instanceof Error ? error.message : String(error)),
      };
    }
  }

  async createActividadAndSesiones(
    actividad: Actividad,
  ): Promise<Actividad | RespuestaGrap> {
    const client = await this.pool.connect();
    try {
      await client.query("BEGIN");
      // Generar ID de actividad si no viene
      const actividadId = actividad.id_actividad || randomUUID();
      // 1. Insertar la actividad
      const result = await client.query(actividadQueries.insertActividad, [
        actividadId,
        actividad.id_programa,
        actividad.id_tipo_actividad,
        actividad.id_responsable,
        actividad.id_aliado,
        actividad.id_sede,
        actividad.id_frecuencia,
        actividad.institucional,
        actividad.nombre_actividad,
        actividad.descripcion,
        actividad.fecha_actividad,
        actividad.hora_inicio,
        actividad.hora_fin,
        actividad.plazo_asistencia,
        actividad.estado,
        actividad.id_creado_por,
        actividad.fecha_creacion,
        actividad.id_modificado_por,
        actividad.fecha_modificacion,
      ]);

      if (
        result.rows.length > 0 &&
        actividad.fecha_actividad &&
        actividad.fecha_actividad
      ) {
        // 2. Generar sesiones según la frecuencia
        const fechaActividad = new Date(actividad.fecha_actividad);
        const sesiones = this.generarSesiones(
          actividadId,
          fechaActividad,
          actividad.frecuencia || "",
          actividad.id_creado_por || "",
          actividad.hora_inicio || "09:00:00",
          actividad.hora_fin || "12:00:00",
        );

        // 3. Insertar las sesiones generadas
        for (const sesion of sesiones) {
          await client.query(actividadQueries.insertSesion, [
            sesion.id_sesion,
            actividadId,
            sesion.fecha_actividad,
            sesion.hora_inicio || "09:00:00",
            sesion.hora_fin || "12:00:00",
            sesion.id_creado_por,
            new Date(),
            sesion.id_creado_por,
            new Date(),
          ]);
        }
      }

      await client.query("COMMIT");

      // Asegura tipado explícito
      return result.rows[0] as Actividad;
    } catch (error) {
      await client.query("ROLLBACK");
      return {
        exitoso: "N",
        mensaje:
          "No se pudo crear actividad: " +
          (error instanceof Error ? error.message : String(error)),
      };
    } finally {
      client.release();
    }
  }

  async createActividad(actividad: Actividad): Promise<RespuestaGrap> {
    try {
      const actividadId = actividad.id_actividad || randomUUID();

      await this.pool.query(actividadQueries.insertActividad, [
        actividadId,
        actividad.id_programa,
        actividad.id_tipo_actividad,
        actividad.id_responsable,
        actividad.id_aliado,
        actividad.id_sede,
        actividad.id_frecuencia,
        actividad.institucional,
        actividad.nombre_actividad,
        actividad.descripcion,
        actividad.fecha_actividad,
        actividad.hora_inicio,
        actividad.hora_fin,
        actividad.plazo_asistencia,
        actividad.estado,
        actividad.id_creado_por,
        actividad.fecha_creacion,
        actividad.id_modificado_por,
        actividad.fecha_modificacion,
      ]);

      return { exitoso: "S", mensaje: "Actividad creada exitosamente" };
    } catch (error) {
      return {
        exitoso: "N",
        mensaje:
          "Error al crear actividad: " +
          (error instanceof Error ? error.message : String(error)),
      };
    }
  }

  async updateById(
    id_actividad: string,
    actividad: Actividad,
  ): Promise<RespuestaGrap> {
    try {
      await this.pool.query(actividadQueries.updateActividad, [
        id_actividad,
        actividad.id_programa,
        actividad.id_tipo_actividad,
        actividad.id_responsable,
        actividad.id_aliado,
        actividad.id_sede,
        actividad.id_frecuencia,
        actividad.institucional,
        actividad.nombre_actividad,
        actividad.descripcion,
        actividad.fecha_actividad,
        actividad.hora_inicio,
        actividad.hora_fin,
        actividad.plazo_asistencia,
        actividad.estado,
        actividad.id_creado_por,
        actividad.fecha_creacion,
        actividad.id_modificado_por,
        actividad.fecha_modificacion,
      ]);

      return { exitoso: "S", mensaje: "Actividad actualizada exitosamente" };
    } catch (error) {
      return {
        exitoso: "N",
        mensaje:
          "Error al actualizar actividad: " +
          (error instanceof Error ? error.message : String(error)),
      };
    }
  }
  

  async deleteById(id_actividad: string): Promise<RespuestaGrap> {
    try {
      await this.pool.query(actividadQueries.deleteActividad, [id_actividad]);
      return { exitoso: "S", mensaje: "Actividad eliminada exitosamente" };
    } catch (error: unknown) {
      return {
        exitoso: "N",
        mensaje: "Error al eliminar actividad: " + String(error),
      };
    }
  }

  /**Metodos propios de la clase auxiliares para los de contrato */
  private generarSesiones(
    idActividad: string,
    fechaActividad: Date,
    frecuencia: string,
    idCreadoPor: string = "",
    hora_inicio: string = "09:00:00",
    hora_fin: string = "12:00:00",
  ): Array<{
    id_sesion: string;
    id_actividad: string;
    fecha_actividad: Date;
    hora_inicio: string;
    hora_fin: string;
    id_creado_por: string;
  }> {
    const sesiones: Array<{
      id_sesion: string;
      id_actividad: string;
      fecha_actividad: Date;
      hora_inicio: string;
      hora_fin: string;
      id_creado_por: string;
    }> = [];
    const fechaActual = new Date(fechaActividad);

    // Si no hay frecuencia definida, crear solo una sesión en la fecha de inicio
    if (!frecuencia) {
      sesiones.push({
        id_sesion: randomUUID(),
        id_actividad: idActividad,
        fecha_actividad: new Date(fechaActividad),
        hora_inicio,
        hora_fin,
        id_creado_por: idCreadoPor,
      });
      return sesiones;
    }

    //Obtener la fecha fin
    const year = fechaActividad.getFullYear();
    const month = fechaActividad.getMonth();
    const fechaFin = new Date(year, month + 1, 0);

    // Generar sesiones según la frecuencia
    while (fechaActual <= fechaFin) {
      // Verificar si es día laboral (lunes a sábado)
      const diaSemana = fechaActual.getDay(); // 0: domingo, 1: lunes, ..., 6: sábado

      if (diaSemana >= 1 && diaSemana <= 6) {
        // Lunes a sábado
        sesiones.push({
          id_sesion: randomUUID(),
          id_actividad: idActividad,
          fecha_actividad: new Date(fechaActual),
          hora_inicio,
          hora_fin,
          id_creado_por: idCreadoPor,
        });
      }

      // Avanzar según la frecuencia
      if (frecuencia === "Diario") {
        fechaActual.setDate(fechaActual.getDate() + 1);
      } else if (frecuencia === "Semanal") {
        fechaActual.setDate(fechaActual.getDate() + 7);
      } else if (frecuencia === "Mensual") {
        fechaActual.setMonth(fechaActual.getMonth() + 1);
      } else {
        break; // Frecuencia no reconocida
      }
    }

    return sesiones;
  }

  // Utility function to format date to YYYY-MM-DD
  private formatDateToYYYYMMDD(date: Date | string): string {
    const d = new Date(date);
    const year = d.getFullYear();
    const month = String(d.getMonth() + 1).padStart(2, "0");
    const day = String(d.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  }
}
