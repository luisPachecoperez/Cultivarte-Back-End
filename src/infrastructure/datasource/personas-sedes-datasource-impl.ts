import {
  PersonasSedesDataSource,
  PersonasSede,
  RespuestaGrap,
} from '../../domain';
import { pgPool } from '../db/pool';
import { personasSedesQueries } from '../db/personas-sedes-queries';
import { BaseHomologatedDataSource } from './base-homologated-datasource';

export class PersonasSedesDataSourceImpl
  extends BaseHomologatedDataSource
  implements PersonasSedesDataSource
{
  constructor() {
    super(pgPool);
  }

  async getAll(
    limit: number,
    offset: number,
  ): Promise<PersonasSede[] | RespuestaGrap> {
    try {
      const getAllRes = await this.pool.query(personasSedesQueries.getAll, [
        limit,
        offset,
      ]);
      return getAllRes.rows as PersonasSede[];
    } catch (error: unknown) {
      const mensaje = await this.buildErrorMessage(
        'Error al obtener personas sedes: ',
        error,
      );
      return {
        exitoso: 'N',
        mensaje,
      };
    }
  }

  async getById(id_sede: string): Promise<PersonasSede | RespuestaGrap> {
    try {
      const getByIdRes = await this.pool.query(personasSedesQueries.getById, [
        id_sede,
      ]);
      return (getByIdRes.rows[0] as PersonasSede) || null;
    } catch (error: unknown) {
      const mensaje = await this.buildErrorMessage(
        'Error al obtener persona sede: ',
        error,
      );
      return {
        exitoso: 'N',
        mensaje,
      };
    }
  }

  async create(personaSede: PersonasSede): Promise<RespuestaGrap> {
    try {
      const values = [
        personaSede.id_personas_sede,
        personaSede.id_persona,
        personaSede.id_sede,
      ];
      await this.pool.query(personasSedesQueries.create, values);
      return { exitoso: 'S', mensaje: 'Persona sede creada correctamente' };
    } catch (error: unknown) {
      const mensaje = await this.buildErrorMessage(
        'Error al crear persona sede: ',
        error,
      );
      return {
        exitoso: 'N',
        mensaje,
      };
    }
  }

  async updateById(
    id_personas_sede: string,
    personaSede: PersonasSede,
  ): Promise<RespuestaGrap> {
    try {
      const values = [
        personaSede.id_personas_sede,
        personaSede.id_persona,
        personaSede.id_sede,
        id_personas_sede,
      ];
      await this.pool.query(personasSedesQueries.updateById, values);
      return {
        exitoso: 'S',
        mensaje: 'Persona sede actualizada correctamente',
      };
    } catch (error: unknown) {
      const mensaje = await this.buildErrorMessage(
        'Error al actualizar persona sede: ',
        error,
      );
      return {
        exitoso: 'N',
        mensaje,
      };
    }
  }

  async deleteById(id_personas_sede: string): Promise<RespuestaGrap> {
    try {
      await this.pool.query(personasSedesQueries.deleteById, [
        id_personas_sede,
      ]);
      return { exitoso: 'S', mensaje: 'Persona sede eliminada correctamente' };
    } catch (error: unknown) {
      const mensaje = await this.buildErrorMessage(
        'Error al eliminar persona sede: ',
        error,
      );
      return {
        exitoso: 'N',
        mensaje,
      };
    }
  }

}
