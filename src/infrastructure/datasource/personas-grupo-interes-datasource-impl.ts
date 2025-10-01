import { pgPool } from "../db/pg-pool";
import {
  PersonaGrupoInteres,
  PersonasGruposInteresDataSource,
  RespuestaGrap,
} from "../../domain";
import { personasGrupoInteresQueries } from "../db/personas-grupo-interes-queries";

export class PersonasGrupoInteresDataSourceImpl
  implements PersonasGruposInteresDataSource
{
  private pool = pgPool;

  async create(
    personaGrupoInteres: PersonaGrupoInteres,
  ): Promise<RespuestaGrap> {
    try {
      const res = await this.pool.query(
        personasGrupoInteresQueries.createPersonaGrupoInteres,
        [personaGrupoInteres],
      );
      return (
        (res.rows[0] as RespuestaGrap) ?? {
          exitoso: "N",
          mensaje: "No se pudo crear persona",
        }
      );
    } catch (error: unknown) {
      return {
        exitoso: "N",
        mensaje:
          "No se pudo crear persona: " +
          (error instanceof Error ? error.message : String(error)),
      };
    }
  }

  async updateById(
    id_persona_grupo_interes: string,
    personaGrupoInteres: PersonaGrupoInteres,
  ): Promise<RespuestaGrap> {
    try {
      const res = await this.pool.query(
        personasGrupoInteresQueries.updatePersonaGrupoInteres,
        [id_persona_grupo_interes, personaGrupoInteres],
      );
      return (
        (res.rows[0] as RespuestaGrap) ?? {
          exitoso: "N",
          mensaje: "No se pudo actualizar persona",
        }
      );
    } catch (error: unknown) {
      return {
        exitoso: "N",
        mensaje:
          "No se pudo actualizar persona: " +
          (error instanceof Error ? error.message : String(error)),
      };
    }
  }

  async deleteById(id_persona_grupo_interes: string): Promise<RespuestaGrap> {
    try {
      const res = await this.pool.query(
        personasGrupoInteresQueries.deletePersonaGrupoInteres,
        [id_persona_grupo_interes],
      );
      return (
        (res.rows[0] as RespuestaGrap) ?? {
          exitoso: "N",
          mensaje: "No se pudo eliminar persona",
        }
      );
    } catch (error: unknown) {
      return {
        exitoso: "N",
        mensaje:
          "No se pudo eliminar persona: " +
          (error instanceof Error ? error.message : String(error)),
      };
    }
  }

  async getAll(): Promise<PersonaGrupoInteres[] | RespuestaGrap> {
    try {
      const res = await this.pool.query(personasGrupoInteresQueries.getAll);
      return res.rows as PersonaGrupoInteres[];
    } catch (error: unknown) {
      return {
        exitoso: "N",
        mensaje:
          "No se pudo obtener personas: " +
          (error instanceof Error ? error.message : String(error)),
      };
    }
  }

  async getById(
    id_persona_grupo_interes: string,
  ): Promise<PersonaGrupoInteres | RespuestaGrap> {
    try {
      const res = await this.pool.query(personasGrupoInteresQueries.getById, [
        id_persona_grupo_interes,
      ]);
      return (
        (res.rows[0] as PersonaGrupoInteres) ?? {
          exitoso: "N",
          mensaje: "Persona no encontrada",
        }
      );
    } catch (error: unknown) {
      return {
        exitoso: "N",
        mensaje:
          "No se pudo obtener persona: " +
          (error instanceof Error ? error.message : String(error)),
      };
    }
  }
}
