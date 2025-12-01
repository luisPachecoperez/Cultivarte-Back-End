"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ParametroDetalleDataSourceImpl = void 0;
const pg_pool_1 = require("../db/pg-pool");
const parametros_detalle_queries_1 = require("../db/parametros-detalle-queries");
class ParametroDetalleDataSourceImpl {
    constructor() {
        this.pool = pg_pool_1.pgPool;
    }
    async getAll() {
        const getAllRes = await this.pool.query(parametros_detalle_queries_1.parametrosDetalleQueries.getAll);
        return getAllRes.rows;
    }
    async getById(id_parametro_detalle) {
        try {
            const getByIdRes = await this.pool.query(parametros_detalle_queries_1.parametrosDetalleQueries.getById, [id_parametro_detalle]);
            return getByIdRes.rows[0] || null;
        }
        catch (error) {
            const mensaje = error instanceof Error ? error.message : JSON.stringify(error);
            return {
                exitoso: 'N',
                mensaje: `Error al obtener parametro detalle: ${mensaje}`,
            };
        }
    }
    async create(parametroDetalle) {
        try {
            const values = [
                parametroDetalle.id_parametro_general,
                parametroDetalle.nombre,
                parametroDetalle.codigo,
                parametroDetalle.orden,
                parametroDetalle.valores,
                parametroDetalle.estado,
            ];
            const result = await this.pool.query(parametros_detalle_queries_1.parametrosDetalleQueries.create, values);
            return result.rows[0] || null;
        }
        catch (error) {
            const mensaje = error instanceof Error ? error.message : JSON.stringify(error);
            return {
                exitoso: 'N',
                mensaje: `Error al crear parametro detalle: ${mensaje}`,
            };
        }
    }
    async updateById(id_parametro_detalle, parametroDetalle) {
        try {
            const values = [
                id_parametro_detalle,
                parametroDetalle.nombre,
                parametroDetalle.codigo,
                parametroDetalle.orden,
                parametroDetalle.valores,
                parametroDetalle.estado,
            ];
            const result = await this.pool.query(parametros_detalle_queries_1.parametrosDetalleQueries.updateById, values);
            return result.rows[0] || null;
        }
        catch (error) {
            const mensaje = error instanceof Error ? error.message : JSON.stringify(error);
            return {
                exitoso: 'N',
                mensaje: `Error al actualizar parametro detalle: ${mensaje}`,
            };
        }
    }
    async deleteById(id_parametro_detalle) {
        try {
            await this.pool.query(parametros_detalle_queries_1.parametrosDetalleQueries.deleteById, [
                id_parametro_detalle,
            ]);
            return {
                exitoso: 'S',
                mensaje: 'Parametro detalle eliminado correctamente',
            };
        }
        catch (error) {
            const mensaje = error instanceof Error ? error.message : JSON.stringify(error);
            return {
                exitoso: 'N',
                mensaje: `Error al eliminar parametro detalle: ${mensaje}`,
            };
        }
    }
}
exports.ParametroDetalleDataSourceImpl = ParametroDetalleDataSourceImpl;
//# sourceMappingURL=parametro-detalle-datasource-impl.js.map