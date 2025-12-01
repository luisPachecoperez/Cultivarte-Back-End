"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ParametriaEventosDataSourceImpl = void 0;
const pg_pool_1 = require("../db/pg-pool");
class ParametriaEventosDataSourceImpl {
    constructor() {
        this.pool = pg_pool_1.pgPool;
    }
    async getAll() {
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
        const result = await this.pool.query(query);
        return result.rows;
    }
}
exports.ParametriaEventosDataSourceImpl = ParametriaEventosDataSourceImpl;
//# sourceMappingURL=parametria-eventos-impl.js.map