"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SedeDataSourceImpl = void 0;
const pg_pool_1 = require("../db/pg-pool");
const sedes_queries_1 = require("../db/sedes-queries");
class SedeDataSourceImpl {
    constructor() {
        this.pool = pg_pool_1.pgPool;
    }
    async getAll() {
        try {
            const result = await this.pool.query(sedes_queries_1.sedesQueries.sedesResult);
            return result.rows;
        }
        catch (error) {
            return {
                exitoso: 'N',
                mensaje: 'No se pudo obtener sedes: ' +
                    (error instanceof Error ? error.message : JSON.stringify(error)),
            };
        }
    }
    async getById(id_sede) {
        try {
            const result = await this.pool.query(sedes_queries_1.sedesQueries.sedeById, [
                id_sede,
            ]);
            if (result.rowCount === 0) {
                return {
                    exitoso: 'N',
                    mensaje: 'No se encontró la sede con id: ' + id_sede,
                };
            }
            return result.rows[0];
        }
        catch (error) {
            return {
                exitoso: 'N',
                mensaje: 'No se pudo obtener la sede: ' +
                    (error instanceof Error ? error.message : JSON.stringify(error)),
            };
        }
    }
    async create(sede) {
        try {
            await this.pool.query(sedes_queries_1.sedesQueries.createSede, [sede]);
            return {
                exitoso: 'S',
                mensaje: 'Sede creada exitosamente',
            };
        }
        catch (error) {
            return {
                exitoso: 'N',
                mensaje: 'No se pudo crear la sede: ' +
                    (error instanceof Error ? error.message : JSON.stringify(error)),
            };
        }
    }
    async updateById(id_sede, sede) {
        try {
            await this.pool.query(sedes_queries_1.sedesQueries.updateSede, [id_sede, sede]);
            return {
                exitoso: 'S',
                mensaje: 'Sede actualizada exitosamente',
            };
        }
        catch (error) {
            return {
                exitoso: 'N',
                mensaje: 'No se pudo actualizar la sede: ' +
                    (error instanceof Error ? error.message : JSON.stringify(error)),
            };
        }
    }
    async deleteById(id_sede) {
        try {
            await this.pool.query(sedes_queries_1.sedesQueries.deleteSede, [id_sede]);
            return {
                exitoso: 'S',
                mensaje: 'Sede eliminada exitosamente',
            };
        }
        catch (error) {
            return {
                exitoso: 'N',
                mensaje: 'No se pudo eliminar la sede: ' +
                    (error instanceof Error ? error.message : JSON.stringify(error)),
            };
        }
    }
}
exports.SedeDataSourceImpl = SedeDataSourceImpl;
//# sourceMappingURL=sede-datasource-impl.js.map