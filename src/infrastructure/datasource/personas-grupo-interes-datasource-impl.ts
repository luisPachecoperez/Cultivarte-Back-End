import { pgPool } from '../db/pool';
import {
  PersonaGrupoInteres,
  PersonasGruposInteresDataSource,
  RespuestaGrap,
} from '../../domain';
import { personasGrupoInteresQueries } from '../db/personas-grupo-interes-queries';
import { BaseHomologatedDataSource } from './base-homologated-datasource';

export class PersonasGrupoInteresDataSourceImpl
  extends BaseHomologatedDataSource
  implements PersonasGruposInteresDataSource
{
  constructor() {
    super(pgPool);
  }

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

  async deleteById(id_persona_grupo_interes: string): Promise<RespuestaGrap> {
    try {
      const res = await this.pool.query(
        personasGrupoInteresQueries.deletePersonaGrupoInteres,
        [id_persona_grupo_interes],
      );
      return (
        (res.rows[0] as RespuestaGrap) ?? {
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

  async getAll(
    limit: number,
    offset: number,
  ): Promise<PersonaGrupoInteres[] | RespuestaGrap> {
    try {
      const res = await this.pool.query(personasGrupoInteresQueries.getAll, [
        limit,
        offset,
      ]);
      return res.rows as PersonaGrupoInteres[];
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
    id_persona_grupo_interes: string,
  ): Promise<PersonaGrupoInteres | RespuestaGrap> {
    try {
      const res = await this.pool.query(personasGrupoInteresQueries.getById, [
        id_persona_grupo_interes,
      ]);
      return (
        (res.rows[0] as PersonaGrupoInteres) ?? {
          exitoso: 'N',
          mensaje: 'Persona no encontrada',
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

}
