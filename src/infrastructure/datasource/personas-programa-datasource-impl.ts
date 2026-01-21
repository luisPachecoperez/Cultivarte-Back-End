import { pgPool } from '../db/pool';
import {
  PersonaPrograma,
  PersonasProgramaDataSource,
  RespuestaGrap,
} from '../../domain';
import { personasProgramaQueries } from '../db/personas-programa-queries';
import { BaseHomologatedDataSource } from './base-homologated-datasource';

export class PersonasProgramaDataSourceImpl
  extends BaseHomologatedDataSource
  implements PersonasProgramaDataSource
{
  constructor() {
    super(pgPool);
  }

  async getAll(
    limit: number,
    offset: number,
  ): Promise<PersonaPrograma[] | RespuestaGrap> {
    try {
      const result = await this.pool.query(personasProgramaQueries.getAll, [
        limit,
        offset,
      ]);
      return result.rows as PersonaPrograma[];
    } catch (error: unknown) {
      const mensaje = await this.buildErrorMessage(
        'Error al obtener personas: ',
        error,
      );
      return {
        exitoso: 'N',
        mensaje,
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
      const mensaje = await this.buildErrorMessage(
        'Error al obtener persona: ',
        error,
      );
      return {
        exitoso: 'N',
        mensaje,
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
      const mensaje = await this.buildErrorMessage(
        'Error al crear persona: ',
        error,
      );
      return {
        exitoso: 'N',
        mensaje,
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
      const mensaje = await this.buildErrorMessage(
        'Error al actualizar persona: ',
        error,
      );
      return {
        exitoso: 'N',
        mensaje,
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
      const mensaje = await this.buildErrorMessage(
        'Error al eliminar persona: ',
        error,
      );
      return {
        exitoso: 'N',
        mensaje,
      };
    }
  }

}
