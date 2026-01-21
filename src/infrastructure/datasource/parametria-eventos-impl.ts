import { ParametriaEventos, ParametriaEventosDataSource } from '../../domain';
import { pgPool } from '../db/pool';
import { BaseHomologatedDataSource } from './base-homologated-datasource';

export class ParametriaEventosDataSourceImpl
  extends BaseHomologatedDataSource
  implements ParametriaEventosDataSource
{
  constructor() {
    super(pgPool);
  }

  async getAll(): Promise<
    Array<{ grupo: keyof ParametriaEventos; id: string; nombre: string }>
  > {
    const query = `
            SELECT 
                CASE 
                    WHEN pg.nombre_parametro ILIKE 'Roles' THEN 'Roles'
                    WHEN pg.nombre_parametro ILIKE 'LC' THEN 'Listado_de_contenidos'
                    WHEN pg.nombre_parametro ILIKE 'LA' THEN 'actividad_general'
                    WHEN pg.nombre_parametro ILIKE 'Programacion' THEN 'Programacion'
                    WHEN pg.nombre_parametro ILIKE 'Aliados' THEN 'Aliados'
                    WHEN pg.nombre_parametro ILIKE 'Eventos' THEN 'Tipo_de_evento'
                END AS grupo,
                pd.id_parametro_detalle AS id,
                pd.nombre AS nombre
            FROM parametros_generales pg
            JOIN parametros_detalle pd 
                ON pg.id_parametro_general = pd.id_parametro_general
            WHERE pg.nombre_parametro IN (
                'Roles',
                'LC',
                'LA',
                'Programacion',
                'Aliados',
                'Eventos'
            )
            ORDER BY grupo, pd.nombre;
        `;
    try {
      const result = await this.pool.query(query);

      return result.rows as Array<{
        grupo: keyof ParametriaEventos;
        id: string;
        nombre: string;
      }>;
    } catch (error: unknown) {
      const mensaje = await this.buildErrorMessage(
        'Error al obtener parametria de eventos: ',
        error,
      );
      throw new Error(mensaje);
    }
  }

}
