"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PoblacionDataSourceImpl = void 0;
const pg_pool_1 = require("../db/pg-pool");
const node_crypto_1 = require("node:crypto");
const poblaciones_queries_1 = require("../db/poblaciones-queries");
class PoblacionDataSourceImpl {
    constructor() {
        this.pool = pg_pool_1.pgPool;
    }
    async getPoblaciones() {
        try {
            const result = await this.pool.query(poblaciones_queries_1.poblacionesQueries.poblacionesResult);
            return result.rows;
        }
        catch (error) {
            const mensaje = error instanceof Error ? error.message : JSON.stringify(error);
            return {
                exitoso: 'N',
                mensaje: `No se pudo obtener poblaciones: ${mensaje}`,
            };
        }
    }
    async getPoblacionById(id_poblacion) {
        try {
            const result = await this.pool.query(poblaciones_queries_1.poblacionesQueries.poblacionById, [
                id_poblacion,
            ]);
            if (result.rowCount === 0) {
                return {
                    exitoso: 'N',
                    mensaje: 'No se encontró la población con el ID proporcionado',
                };
            }
            return result.rows[0];
        }
        catch (error) {
            const mensaje = error instanceof Error ? error.message : JSON.stringify(error);
            console.error('Error en getPoblacionById:', mensaje);
            return {
                exitoso: 'N',
                mensaje: `Error al obtener la población: ${mensaje}`,
            };
        }
    }
    async createPoblacion(poblacion) {
        try {
            const result = await this.pool.query(poblaciones_queries_1.poblacionesQueries.createPoblacion, [
                poblacion.id_poblacion || (0, node_crypto_1.randomUUID)(),
                poblacion.id_padre || null,
                poblacion.nombre,
            ]);
            if (!result.rows[0]) {
                return {
                    exitoso: 'N',
                    mensaje: 'No se pudo crear la población',
                };
            }
            return {
                exitoso: 'S',
                mensaje: 'Población creada exitosamente',
            };
        }
        catch (error) {
            const mensaje = error instanceof Error ? error.message : JSON.stringify(error);
            console.error('Error en createPoblacion:', mensaje);
            return {
                exitoso: 'N',
                mensaje: `No se pudo crear la población: ${mensaje}`,
            };
        }
    }
    async updatePoblacionById(id_poblacion, poblacion) {
        try {
            const result = await this.pool.query(poblaciones_queries_1.poblacionesQueries.updatePoblacion, [
                id_poblacion,
                poblacion.nombre,
            ]);
            return result.rows[0] || null;
        }
        catch (error) {
            const mensaje = error instanceof Error ? error.message : JSON.stringify(error);
            return {
                exitoso: 'N',
                mensaje: `No se pudo actualizar poblacion: ${mensaje}`,
            };
        }
    }
    async deletePoblacionById(id_poblacion) {
        try {
            const result = await this.pool.query(poblaciones_queries_1.poblacionesQueries.deletePoblacion, [
                id_poblacion,
            ]);
            return result.rows[0] || null;
        }
        catch (error) {
            const mensaje = error instanceof Error ? error.message : JSON.stringify(error);
            return {
                exitoso: 'N',
                mensaje: `No se pudo eliminar poblacion: ${mensaje}`,
            };
        }
    }
}
exports.PoblacionDataSourceImpl = PoblacionDataSourceImpl;
//# sourceMappingURL=poblaciones-datasource-impl.js.map