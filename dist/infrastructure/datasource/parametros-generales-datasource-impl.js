"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ParametrosGeneralesDataSourceImpl = void 0;
const pg_pool_1 = require("../db/pg-pool");
const parametros_generales_queries_1 = require("../db/parametros-generales-queries");
class ParametrosGeneralesDataSourceImpl {
    constructor() {
        this.pool = pg_pool_1.pgPool;
    }
    async getAll() {
        try {
            const res = await this.pool.query(parametros_generales_queries_1.parametrosGeneralesQueries.getAll);
            return res.rows;
        }
        catch (error) {
            return {
                exitoso: 'N',
                mensaje: 'Error al obtener los parametros generales: ' +
                    (error instanceof Error ? error.message : JSON.stringify(error)),
            };
        }
    }
    async getById(id_parametro_general) {
        try {
            const getByIdRes = await this.pool.query(parametros_generales_queries_1.parametrosGeneralesQueries.getById, [id_parametro_general]);
            return getByIdRes.rows[0] || null;
        }
        catch (error) {
            return {
                exitoso: 'N',
                mensaje: 'Error al obtener parametro general: ' +
                    (error instanceof Error ? error.message : JSON.stringify(error)),
            };
        }
    }
    async create(parametrosGenerales) {
        try {
            const values = [
                parametrosGenerales.nombre_parametro,
                parametrosGenerales.descripcion,
                parametrosGenerales.estado,
            ];
            await this.pool.query(parametros_generales_queries_1.parametrosGeneralesQueries.create, values);
            return {
                exitoso: 'S',
                mensaje: 'Parametro general creado correctamente',
            };
        }
        catch (error) {
            return {
                exitoso: 'N',
                mensaje: 'Error al crear parametro general: ' +
                    (error instanceof Error ? error.message : JSON.stringify(error)),
            };
        }
    }
    async updateById(id_parametro_general, parametrosGenerales) {
        try {
            const values = [
                id_parametro_general,
                parametrosGenerales.nombre_parametro,
                parametrosGenerales.descripcion,
                parametrosGenerales.estado,
            ];
            await this.pool.query(parametros_generales_queries_1.parametrosGeneralesQueries.updateById, values);
            return {
                exitoso: 'S',
                mensaje: 'Parametro general actualizado correctamente',
            };
        }
        catch (error) {
            return {
                exitoso: 'N',
                mensaje: 'Error al actualizar parametro general: ' +
                    (error instanceof Error ? error.message : JSON.stringify(error)),
            };
        }
    }
    async deleteById(id_parametro_general) {
        try {
            await this.pool.query(parametros_generales_queries_1.parametrosGeneralesQueries.deleteById, [
                id_parametro_general,
            ]);
            return {
                exitoso: 'S',
                mensaje: 'Parametro general eliminado correctamente',
            };
        }
        catch (error) {
            return {
                exitoso: 'N',
                mensaje: 'Error al eliminar parametro general: ' +
                    (error instanceof Error ? error.message : JSON.stringify(error)),
            };
        }
    }
}
exports.ParametrosGeneralesDataSourceImpl = ParametrosGeneralesDataSourceImpl;
//# sourceMappingURL=parametros-generales-datasource-impl.js.map