"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CalendarioFechaDataSourceImpl = void 0;
const pg_pool_1 = require("../db/pg-pool");
const calendario_queries_1 = require("../db/calendario-queries");
class CalendarioFechaDataSourceImpl {
    constructor() {
        this.pool = pg_pool_1.pgPool;
    }
    async getByDate(calendarioInput) {
        try {
            const result = await this.pool.query(calendario_queries_1.calendarioQueries.getByDate, [
                calendarioInput.fecha_inicial,
                calendarioInput.fecha_final,
            ]);
            const eventos = result.rows;
            return eventos;
        }
        catch (error) {
            return {
                exitoso: 'N',
                mensaje: 'Error al obtener eventos por fecha: ' +
                    (error instanceof Error ? error.message : JSON.stringify(error)),
            };
        }
    }
}
exports.CalendarioFechaDataSourceImpl = CalendarioFechaDataSourceImpl;
//# sourceMappingURL=calendario-fecha-datasource-impl.js.map