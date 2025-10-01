import { PoblacionRepository } from "../../domain";
import { PoblacionDataSource } from "../../domain";
import { Poblacion } from "../../domain";
import { RespuestaGrap } from "../../domain";

export class PoblacionRepositoryImpl implements PoblacionRepository {
  constructor(private dataSource: PoblacionDataSource) {}

  async createPoblacion(poblacion: Poblacion): Promise<RespuestaGrap> {
    try {
      const result = await this.dataSource.createPoblacion(poblacion);
      return result;
    } catch (error: unknown) {
      return {
        exitoso: "N",
        mensaje:
          "No se pudo crear población: " +
          (error instanceof Error ? error.message : String(error)),
      };
    }
  }

  async updatePoblacionById(
    id_poblacion: string,
    poblacion: Poblacion,
  ): Promise<RespuestaGrap> {
    try {
      const result = await this.dataSource.updatePoblacionById(
        id_poblacion,
        poblacion,
      );
      return result;
    } catch (error: unknown) {
      return {
        exitoso: "N",
        mensaje:
          "No se pudo actualizar población: " +
          (error instanceof Error ? error.message : String(error)),
      };
    }
  }

  async deletePoblacionById(id_poblacion: string): Promise<RespuestaGrap> {
    try {
      const result = await this.dataSource.deletePoblacionById(id_poblacion);
      return result;
    } catch (error: unknown) {
      return {
        exitoso: "N",
        mensaje:
          "No se pudo eliminar población: " +
          (error instanceof Error ? error.message : String(error)),
      };
    }
  }

  async getPoblaciones(): Promise<Poblacion[] | RespuestaGrap> {
    try {
      const result = await this.dataSource.getPoblaciones();
      return result;
    } catch (error: unknown) {
      return {
        exitoso: "N",
        mensaje:
          "No se pudo obtener poblaciones: " +
          (error instanceof Error ? error.message : String(error)),
      };
    }
  }

  async getPoblacionById(
    id_poblacion: string,
  ): Promise<Poblacion | RespuestaGrap> {
    try {
      const result = await this.dataSource.getPoblacionById(id_poblacion);
      return result;
    } catch (error: unknown) {
      return {
        exitoso: "N",
        mensaje:
          "No se pudo obtener población por id: " +
          (error instanceof Error ? error.message : String(error)),
      };
    }
  }
}
