import {
  Actividad,
  ActividadDataSource,
  ActividadRepository,
  PreCreateActividad,
  RespuestaGrap,
  PreEditActividad,
} from "../../domain";

export class ActividadRepositoryImpl implements ActividadRepository {
  constructor(private actividadDataSource: ActividadDataSource) {}

  async getPreCreateActividad(
    id_usuario: string,
  ): Promise<PreCreateActividad | RespuestaGrap> {
    try {
      return this.actividadDataSource.getPreCreateActividad(id_usuario);
    } catch (error: unknown) {
      return {
        exitoso: "N",
        mensaje:
          "Error al obtener pre-create actividad: " +
          (error instanceof Error ? error.message : String(error)),
      };
    }
  }

  async getPreEditActividad(
    id_actividad: string,
    id_usuario: string,
  ): Promise<PreEditActividad | RespuestaGrap> {
    try {
      return this.actividadDataSource.getPreEditActividad(
        id_actividad,
        id_usuario,
      );
    } catch (error: unknown) {
      return {
        exitoso: "N",
        mensaje:
          "Error al obtener pre-edit actividad: " +
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
      return this.actividadDataSource.getActividadSedes(
        id_usuario,
        fecha_inicio,
        fecha_fin,
      );
    } catch (error: unknown) {
      return {
        exitoso: "N",
        mensaje:
          "Error al obtener actividades por sedes: " +
          (error instanceof Error ? error.message : String(error)),
      };
    }
  }

  async getAll(
    limit: number,
    offset: number,
  ): Promise<Actividad[] | RespuestaGrap> {
    try {
      return this.actividadDataSource.getAll(limit, offset);
    } catch (error: unknown) {
      return {
        exitoso: "N",
        mensaje:
          "Error al obtener actividades: " +
          (error instanceof Error ? error.message : String(error)),
      };
    }
  }

  async getById(id: string): Promise<Actividad | RespuestaGrap> {
    try {
      return this.actividadDataSource.getById(id);
    } catch (error: unknown) {
      return {
        exitoso: "N",
        mensaje:
          "Error al obtener actividad por id: " +
          (error instanceof Error ? error.message : String(error)),
      };
    }
  }

  async createActividadAndSesiones(
    actividad: Actividad,
  ): Promise<Actividad | RespuestaGrap> {
    try {
      return this.actividadDataSource.createActividadAndSesiones(actividad);
    } catch (error: unknown) {
      return {
        exitoso: "N",
        mensaje:
          "Error al crear actividad y sesiones: " +
          (error instanceof Error ? error.message : String(error)),
      };
    }
  }

  async createActividad(actividad: Actividad): Promise<RespuestaGrap> {
    try {
      return this.actividadDataSource.createActividad(actividad);
    } catch (error: unknown) {
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
  ): Promise<Actividad | RespuestaGrap> {
    try {
      return this.actividadDataSource.updateById(id_actividad, actividad);
    } catch (error: unknown) {
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
      return this.actividadDataSource.deleteById(id_actividad);
    } catch (error: unknown) {
      return {
        exitoso: "N",
        mensaje:
          "Error al eliminar actividad: " +
          (error instanceof Error ? error.message : String(error)),
      };
    }
  }
}
