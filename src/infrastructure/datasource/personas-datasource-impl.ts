import { Persona, PersonaDataSource, RespuestaGrap } from '../../domain';
import { pgPool } from '../db/pool';
import { personaQueries } from '../db/personas-queries';

export class PersonaDataSourceImpl implements PersonaDataSource {
  private readonly pool = pgPool;

  async getAll(
    limit: number,
    offset: number,
  ): Promise<Persona[] | RespuestaGrap> {
    try {
      const res = await this.pool.query(personaQueries.getAll, [limit, offset]);
      return res.rows as Persona[];
    } catch (error: unknown) {
      return {
        exitoso: 'N',
        mensaje:
          'No se pudo obtener personas: ' +
          (error instanceof Error ? error.message : JSON.stringify(error)),
      };
    }
  }

  async getById(id_persona: string): Promise<Persona | RespuestaGrap> {
    try {
      const res = await this.pool.query(personaQueries.getById, [id_persona]);
      return (res.rows[0] as Persona) || null;
    } catch (error: unknown) {
      return {
        exitoso: 'N',
        mensaje:
          'No se pudo obtener persona: ' +
          (error instanceof Error ? error.message : JSON.stringify(error)),
      };
    }
  }

  async createPersona(persona: Persona): Promise<Persona | RespuestaGrap> {
    try {
      const res = await this.pool.query(personaQueries.createPersona, [
        persona,
      ]);
      return (res.rows[0] as Persona) || null;
    } catch (error: unknown) {
      return {
        exitoso: 'N',
        mensaje:
          'No se pudo crear persona: ' +
          (error instanceof Error ? error.message : JSON.stringify(error)),
      };
    }
  }

  async updatePersona(
    id_persona: string,
    persona: Persona,
  ): Promise<Persona | RespuestaGrap> {
    try {
      const res = await this.pool.query(personaQueries.updatePersona, [
        id_persona,
        persona,
      ]);
      return (res.rows[0] as Persona) || null;
    } catch (error: unknown) {
      return {
        exitoso: 'N',
        mensaje:
          'No se pudo actualizar persona: ' +
          (error instanceof Error ? error.message : JSON.stringify(error)),
      };
    }
  }

  async deletePersona(id_persona: string): Promise<RespuestaGrap> {
    try {
      const res = await this.pool.query(personaQueries.deletePersona, [
        id_persona,
      ]);
      return (
        (res.rows[0] as RespuestaGrap) || {
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

  async getAliadosSede(id_usuario: string): Promise<Persona[] | RespuestaGrap> {
    try {
      const res = await this.pool.query(personaQueries.getAliadosSede, [
        id_usuario,
      ]);
      return (res.rows as Persona[]) || [];
    } catch (error: unknown) {
      console.error('Error en getAliadosSede:', error);
      return {
        exitoso: 'N',
        mensaje:
          'No se pudo obtener aliados: ' +
          (error instanceof Error ? error.message : JSON.stringify(error)),
      };
    }
  }

  async getBenSedes(): Promise<Persona[] | RespuestaGrap> {
    try {
      const res = await this.pool.query(personaQueries.getBeneficiariosSede);
      return res.rows as Persona[];
    } catch (error: unknown) {
      return {
        exitoso: 'N',
        mensaje:
          'No se pudo obtener beneficiarios: ' +
          (error instanceof Error ? error.message : JSON.stringify(error)),
      };
    }
  }

  async getBeneficiarios(): Promise<Persona[] | RespuestaGrap> {
    try {
      const res = await this.pool.query(personaQueries.getBeneficiarios);
      return res.rows as Persona[];
    } catch (error: unknown) {
      return {
        exitoso: 'N',
        mensaje:
          'No se pudo obtener beneficiarios: ' +
          (error instanceof Error ? error.message : JSON.stringify(error)),
      };
    }
  }
}
