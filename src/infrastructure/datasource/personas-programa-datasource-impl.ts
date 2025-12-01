import { pgPool } from '../db/pool';
import {
  PersonaPrograma,
  PersonasProgramaDataSource,
  RespuestaGrap,
} from '../../domain';
import { personasProgramaQueries } from '../db/personas-programa-queries';

export class PersonasProgramaDataSourceImpl
  implements PersonasProgramaDataSource
{
  private readonly pool = pgPool;

  async getAll(): Promise<PersonaPrograma[] | RespuestaGrap> {
    try {
      const result = await this.pool.query(personasProgramaQueries.getAll);
      return result.rows as PersonaPrograma[];
    } catch (error: unknown) {
      return {
        exitoso: 'N',
        mensaje:
          'No se pudo obtener personas: ' +
          (error instanceof Error ? error.message : JSON.stringify(error)),
      };
    }
  }

  async getById(
    id_persona_programa: string,
  ): Promise<PersonaPrograma | RespuestaGrap> {
    try {
      const result = await this.pool.query(personasProgramaQueries.getById, [
        id_persona_programa,
      ]);
      return (
        (result.rows[0] as PersonaPrograma) ?? {
          exitoso: 'N',
          mensaje: 'Persona programa no encontrada',
        }
      );
    } catch (error: unknown) {
      return {
        exitoso: 'N',
        mensaje:
          'No se pudo obtener persona: ' +
          (error instanceof Error ? error.message : JSON.stringify(error)),
      };
    }
  }

  async create(personaPrograma: PersonaPrograma): Promise<RespuestaGrap> {
    try {
      const result = await this.pool.query(personasProgramaQueries.create, [
        personaPrograma.id_persona_programa,
        personaPrograma.id_persona,
        personaPrograma.id_programa,
      ]);
      return (
        (result.rows[0] as RespuestaGrap) ?? {
          exitoso: 'N',
          mensaje: 'No se pudo crear persona',
        }
      );
    } catch (error: unknown) {
      return {
        exitoso: 'N',
        mensaje:
          'No se pudo crear persona: ' +
          (error instanceof Error ? error.message : JSON.stringify(error)),
      };
    }
  }

  async updateById(
    id_persona_programa: string,
    personaPrograma: PersonaPrograma,
  ): Promise<RespuestaGrap> {
    try {
      const result = await this.pool.query(personasProgramaQueries.updateById, [
        id_persona_programa,
        personaPrograma.id_persona,
        personaPrograma.id_programa,
      ]);
      return (
        (result.rows[0] as RespuestaGrap) ?? {
          exitoso: 'N',
          mensaje: 'No se pudo actualizar persona',
        }
      );
    } catch (error: unknown) {
      return {
        exitoso: 'N',
        mensaje:
          'No se pudo actualizar persona: ' +
          (error instanceof Error ? error.message : JSON.stringify(error)),
      };
    }
  }

  async deleteById(id_persona_programa: string): Promise<RespuestaGrap> {
    try {
      const result = await this.pool.query(personasProgramaQueries.deleteById, [
        id_persona_programa,
      ]);
      return (
        (result.rows[0] as RespuestaGrap) ?? {
          exitoso: 'N',
          mensaje: 'No se pudo eliminar persona',
        }
      );
    } catch (error: unknown) {
      return {
        exitoso: 'N',
        mensaje:
          'No se pudo eliminar persona: ' +
          (error instanceof Error ? error.message : JSON.stringify(error)),
      };
    }
  }
}
